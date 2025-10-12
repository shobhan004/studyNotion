import User from "../model/User.js";
import mailSender from "../utils/mailsender.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const validUser = await User.findOne({ email: email });

        if (!validUser) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email`,
            });
        }

        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 300000,
            },
            { new: true }
        );

        const url = `http://localhost:3000/update-password/${token}`;
        
        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { password, confirmpassword, token } = req.body;

        if (confirmpassword !== password) {
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            });
        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            });
        }

        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            });
        }
        
        const hashedpassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            { password: hashedpassword },
            { new: true }
        );

        res.json({
            success: true,
            message: `Password Reset Successful`,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        });
    }
};