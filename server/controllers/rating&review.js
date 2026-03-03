const RatingAndReview = require("../model/RatingandReview");
const mongoose = require("mongoose");

// ✅ Create Rating & Review (Auth Required)
exports.createRating = async (req, res) => {
    try {
        console.log("at the create rating");
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;

         console.log("📥 Data received:", { rating, review, courseId, userId }); // 👈 add kar

        if (!rating || !review) {
            return res.status(400).json({ success: false, message: "Rating and review are required" });
        }

        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return res.status(403).json({ success: false, message: "You have already reviewed this course" });
        }

        const newRating = await RatingAndReview.create({ user: userId, rating, review, course: courseId });
         console.log("succes");

        return res.status(201).json({ success: true, message: "Review submitted!", data: newRating });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get All Ratings — Public, for Testimonial section
exports.getAllRatings = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: -1 })
            .limit(10)
            .populate("user", "email image") // sirf ye do fields hain; // email bhi add kiya fallback ke liye

        console.log("Sample user data:", allReviews[0]?.user); // 👈 dekh kya aa raha hai

        return res.status(200).json({ success: true, data: allReviews });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};