const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const User = require("../model/User");
const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const mailSender = require("../utils/mailsender");

// 1. Capture Payment (Order Create karna)
exports.capturePayment = async (req, res) => {
    const userId = req.user.id;

    try {
        const userDetails = await User.findById(userId).populate("cart");
        if (!userDetails || userDetails.cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        let totalAmount = 0;
        userDetails.cart.forEach((course) => {
            totalAmount += course.price;
        });

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        };

        const paymentResponse = await instance.orders.create(options);
        
        return res.status(200).json({
            success: true,
            data: paymentResponse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Could not initiate order." });
    }
};

// 2. Verify Payment (Signature Check & Enrollment Trigger)
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
        return res.status(400).json({ success: false, message: "Payment details missing" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // Signature match ho gaya, ab enrollment karo
        try {
            await enrollStudent(userId);
            return res.status(200).json({
                success: true,
                message: "Payment Verified and Student Enrolled Successfully",
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return res.status(400).json({ success: false, message: "Invalid Signature, Payment Failed" });
};

// 3. Helper Function: Enroll Student (Logic & Email)
const enrollStudent = async (userId) => {
    try {
        const user = await User.findById(userId).populate("cart");
        if (!user) throw new Error("User not found");

        const cartCourseIds = user.cart.map(course => course._id);
        const courseNames = user.cart.map(course => course.courseName).join(", ");
        const newCourseProgressIds = [];

        // Har course ke liye loop chalao
        for (const courseId of cartCourseIds) {
            // A) Course document update karo
            await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } }
            );

            // B) Progress Tracker create karo
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });
            newCourseProgressIds.push(courseProgress._id);
        }

        // 4. User model update karo aur cart khali karo
        user.courses = [...(user.courses || []), ...cartCourseIds];
        user.courseProgress = [...(user.courseProgress || []), ...newCourseProgressIds];
        user.cart = [];
        await user.save();

        // 5. 📧 Professional Enrollment Email
        const enrollmentEmailBody = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
            <div style="background-color: #0056b3; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #fff; margin: 0;">Enrollment Successful</h2>
            </div>
            <div style="padding: 20px;">
                <p>Dear <b>${user.firstName || user.firstname}</b>,</p>
                <p>Congratulations! You have successfully enrolled in the following course(s):</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0;">
                    <b>${courseNames}</b>
                </div>
                <p>You can now log in to your dashboard to access your course materials and begin your learning journey.</p>
                <p>Best regards,<br/><b>The StudyNotion Team</b></p>
            </div>
        </div>`;

        await mailSender(
            user.email,
            `Enrollment Successful - StudyNotion`,
            enrollmentEmailBody
        );

        return true;
    } catch (error) {
        console.error("Enrollment Error:", error);
        throw new Error("Something went wrong during enrollment");
    }
};

// 4. Payment Success Email
exports.sendPaymentSuccessmail = async (req, res) => {
    // 🚀 FIX: order_id aur payment_id EXACT match kar diye hain bug hatane ke liye
    const { amount, order_id, payment_id } = req.body; 
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        // 📧 Professional Payment Receipt Email
        const receiptEmailBody = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
            <div style="background-color: #28a745; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #fff; margin: 0;">Payment Receipt</h2>
            </div>
            <div style="padding: 20px;">
                <p>Dear <b>${user.firstName || user.firstname}</b>,</p>
                <p>We have successfully received your payment. Below are your transaction details:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><b>Order ID:</b></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${order_id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><b>Payment ID:</b></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${payment_id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><b>Amount Paid:</b></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">₹${amount / 100}</td>
                    </tr>
                </table>
                <p>Thank you for choosing StudyNotion!</p>
                <p>Best regards,<br/><b>The StudyNotion Team</b></p>
            </div>
        </div>`;

        await mailSender(
            user.email,
            "Payment Receipt - StudyNotion",
            receiptEmailBody
        );
        
        return res.status(200).json({ success: true, message: "Payment success mail sent" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Mail error" });
    }
};