// middlewares/auth.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Define a constant for the secret key
const JWT_SECRET = "92ae91a1ebe5ce3e170175fc5beff16c34949cb954accb16a8b7e9ae1aac0db7ff0721a1baec8ed2aa131f1c06cc93bc3899efd3f693139a7d790df185633fe9"

exports.auth = async (req, res, next) => {
    try {
        console.log("at the auth");
        const token = req.headers.authorization?.split(" ")[1] || null;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided." });
        }

        // Check if the secret key is defined before verifying
        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined.");
            return res.status(500).json({ success: false, message: "Server configuration error." });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
             console.log("Decoded user:", decoded);
            req.user = decoded;
            next();
        } catch (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ success: false, message: "Invalid token." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};




// Check if User is Student
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "User role cannot be verified" });
    }
};

// Check if User is Instructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "User role cannot be verified" });
    }
};

// Check if User is Admin (Ye wala chahiye abhi!) ✅
exports.isAdmin = async (req, res, next) => {
    try {
        // Console karke dekh lena payload mein kya aa raha hai (accountType ya role)
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "User role cannot be verified" });
    }
};