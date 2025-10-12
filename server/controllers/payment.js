const { Currency, Receipt } = require("lucide-react");
const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const User = require("../model/User");
const mailSender = require("../utils/mailsender");

exports.capturePayment = async(req , res) =>{
    const userId = req.user.id;

    if(!userId){
        return res.status(400).json({
            success : false,
            message: "userId not found",
        })
    }

    let totalAmount = 0;

    const userDetails = await User.findById(userId);
    if(!userDetails){
        console.log("cannot find userDetails");
        return res.status(400).json({
            success: false,
            message : "userdetails not founded",
        })
    }

    const courses = userDetails.addedCourses;
    
    for(const course of courses){
        totalAmount += course.price;
    }

     const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),
        //  receipt ke andar razor pay ek unique string deni hoti hai jo vo store krta hai
     }

     try{
        // initiate the payment this line gve call to razorpay backend server server pr order create krti hai
        const paymentResponse = await instance.orders.create(options);
       console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
      userDetails,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
     

}

exports.verifyPayment = async(req, res) =>{
    console.log("verifyPayment hit:", req.body);

    // jab bhi user razorpay checkout se payment krta hai to 3 cheeze return hoti hai usse milte hai
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
//   signature ko hum apne secret key se check compare krte hai

  const userId = req.user.id;
 
  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId ){
    return res.status(400).json({
        success : false,
        message : "payment failed",
    })
  }

//   validation step hai yaad krna 
const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")
     console.log("expectedSignature:", expectedSignature)
console.log("razorpay_signature:", razorpay_signature)

    if(expectedSignature == razorpay_signature){
        await enrollStudent(userId ,res);
        const userDetails = await User.findById(userId);
        const purchasedCourses = userDetails.purchasedCourses;
        console.log(purchasedCourses);
        return res.status(200).json({
            success : true,
            message : "Student enrolled successfully",
            purchasedCourses,
        })
    }
      return res.status(400).json({ success: false, message: "Payment Failed" })
}

const enrollStudent = async(userId ,res) =>{
if(!userId){
  console.log("userid not founded");
}

const user = await User.findById(userId);
if(!user){
    console.log("userid not founded");
}
try{
     user.purchasedCourses = user.addedCourses;
     await user.save();
    
     const emailResponse = await mailSender(
             user.email,
             `Successfully Enrolled into courses`,
            `${user.firstname} is successfully enrolled in course`,
           )


}catch(error){
    return res.status(400).json({
        success : false,
        message:"Something went wrong"
    })
}
}

exports.sendPaymentSuccessmail = async(req, res)=>{
    try{
       const {payment ,order_Id , payment_Id} = req.body;
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success : false,
                message: "could not find the userid",
            })
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message: " User not founded",
            })
        }
        await mailSender(
            user.email,
            "Payment Received",
            `${user.firstname} has successfully completed payment`,
        )

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"There is something wrong in sending mail",
        })
    }
}
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }