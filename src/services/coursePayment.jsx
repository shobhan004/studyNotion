// coursePayment.js - Fixed version

import toast from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { Payment } from "./apis";
import rzp_logo from "../assets/Logo/rzp_logo.png"
import { useDispatch } from "react-redux";
import { setCourse } from "../slices/courseSlice";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        
        script.onload = () => {
            resolve(true);
        }
        
        script.onerror = () => {
            resolve(false);
        }
        
        // Script append karna body mein - yeh promise ke andar hona chahiye
        document.body.appendChild(script);
    });
}

export const BuyCourse = async(token, navigate, dispatch) => {
    
    const toastId = toast.loading("Loading...");
    
    try {
        // Pehle Razorpay script load karo
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const { BUY_NOW_PAYMENT_API, VERIFY_PAYMENT_API, SUCCESS_MAIL_SENDER_API } = Payment;
        
        // Order create karo backend se
        const orderResponse = await apiConnector(
            "POST", 
            BUY_NOW_PAYMENT_API, 
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        console.log("Order Response:", orderResponse.data); // Debug ke liye

        const userDetails = orderResponse.data.userDetails;
        
        const options = {
            key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
 // Make sure yeh .env mein properly set hai
            amount: orderResponse.data.data.amount,
            currency: orderResponse.data.data.currency,
            name: "STUDYNOTION",
            description: "THANK YOU FOR PURCHASING COURSES",
            image: rzp_logo,
            order_id: orderResponse.data.data.id, // Yeh important hai - order_id add karo
            prefill: {
                email: userDetails.email,
                name: userDetails.firstname,
            },
            handler: function (response) {
                console.log("Payment Response:", response); // Debug ke liye
                // Send successful payment mail
                sendPaymentSuccessmail(response, orderResponse.data.data.amount, token);
                // Verify Payment
                verifyPayment( response ,userDetails, token, navigate, dispatch);
            },
            modal: {
                ondismiss: function() {
                    toast.error("Payment cancelled");
                }
            }
        };

        // Check karo ki Razorpay available hai ya nhi
        if (typeof window.Razorpay === 'undefined') {
            toast.error("Razorpay not loaded properly");
            return;
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
    } catch (error) {
        console.log("Payment Error:", error);
        toast.error("Could not Complete Payment");
    }
    
    toast.dismiss(toastId);
}

async function sendPaymentSuccessmail(paymentResponse, amount, token) {
    try {
        const { SUCCESS_MAIL_SENDER_API } = Payment;
        
        const res = await apiConnector("POST", SUCCESS_MAIL_SENDER_API, {
            order_ID: paymentResponse.razorpay_order_id, // Note: underscore hai, camelCase nhi
            payment_ID: paymentResponse.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`,
        });
        
        console.log("Mail sent:", res.data);
        
    } catch (error) {
        console.log("Mail sending error:", error);
        // Don't throw error here, just log it
    }
}

async function verifyPayment(bodyData, userDetails, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment. Please wait...");
    
    try {
        const { VERIFY_PAYMENT_API } = Payment;
        
        const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        console.log("Payment verification response:", response.data);
        console.log("Purchased courses:", response.data.purchasedCourses);

        // IMMEDIATELY dispatch करें - setTimeout से पहले
        if (response.data.purchasedCourses) {
            dispatch(setCourse(response.data.purchasedCourses));
        }

        toast.success("Payment Successful! Redirecting...");
        
        // Navigate without setTimeout - immediate
        navigate("/dashboard/mycourses");
        
    } catch (error) {
        console.log("Payment verification error:", error);
        toast.error("Payment verification failed");
    }
    
    toast.dismiss(toastId);
}