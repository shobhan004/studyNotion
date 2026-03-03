import toast from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { Payment } from "./apis";
import rzp_logo from "../assets/Logo/rzp_logo.png"
import { setCourse } from "../slices/courseSlice";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// 🚀 FIX 1: User data yahan accept karo (jahan se BuyCourse call hota hai, wahan se bhejna padega)
export const BuyCourse = async (token, coursesId, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");
    
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            toast.dismiss(toastId);
            return;
        }

        const { BUY_NOW_PAYMENT_API } = Payment;
        
        // 1. Backend se order create karo
        const orderResponse = await apiConnector(
            "POST", 
            BUY_NOW_PAYMENT_API, 
            { courses: coursesId },
            { Authorization: `Bearer ${token}` }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        console.log("Order Response:", orderResponse.data); 

        // 2. Razorpay Options (Redux wale userDetails ka use)
        const options = {
            key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY, 
            amount: orderResponse.data.data.amount,
            currency: orderResponse.data.data.currency,
            name: "STUDYNOTION",
            description: "THANK YOU FOR PURCHASING COURSES",
            image: rzp_logo,
            order_id: orderResponse.data.data.id,
            prefill: {
                // 🚀 FIX 2: Optional chaining aur fallback string
                name: userDetails?.firstName || userDetails?.firstname || "Guest User",
                email: userDetails?.email || "guest@example.com",
            },
            handler: function (response) {
                console.log("Payment Success Response:", response); 
                sendPaymentSuccessmail(response, orderResponse.data.data.amount, token);
                verifyPayment(response, token, navigate, dispatch);
            },
            theme: { color: "#3399cc" },
            modal: {
                ondismiss: function() {
                    toast.error("Payment cancelled");
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
    } catch (error) {
        console.log("Payment Error:", error);
        toast.error("Could not Complete Payment");
    }
    toast.dismiss(toastId);
}

// Helper: Send Mail
async function sendPaymentSuccessmail(paymentResponse, amount, token) {
    try {
        const { SUCCESS_MAIL_SENDER_API } = Payment;
        await apiConnector("POST", SUCCESS_MAIL_SENDER_API, {
            order_id: paymentResponse.razorpay_order_id, 
            payment_id: paymentResponse.razorpay_payment_id,
            amount,
        }, { Authorization: `Bearer ${token}` });
    } catch (error) {
        console.log("Mail sending error:", error);
    }
}

// Helper: Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment. Please wait...");
    try {
        const { VERIFY_PAYMENT_API } = Payment;
        const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        if (response.data.purchasedCourses) {
            dispatch(setCourse(response.data.purchasedCourses));
        }

        toast.success("Payment Successful! 🎉");
        navigate("/dashboard/enrolled-courses");
    } catch (error) {
        console.log("Payment verification error:", error);
        toast.error("Payment verification failed");
    }
    toast.dismiss(toastId);
}