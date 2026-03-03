const mongoose = require("mongoose");

const ratingandreview = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        trim : true,
        ref : "User",
    },
    review : {
       type : String,
       required : true,
    },
    rating : {
        type : Number,
        required : true,
    },
     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
})

module.exports = mongoose.model("RatingAndReview" ,ratingandreview);
