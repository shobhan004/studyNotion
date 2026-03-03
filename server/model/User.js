const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required: true, // Ise required kar do taaki koi bina role ke na aaye
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        additionaldetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        
        // 🚀 THE PRO APPROACH: Use References
        // Agar user Instructor hai, toh ye unke banaye courses honge.
        // Agar user Student hai, toh ye unke kharide hue courses honge.
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        
        // Cart items ke liye bhi sirf ObjectId store karo
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            }
        ],

        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
        },
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CourseProgress", // Make sure "CourseProgress" model exist karta ho
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);