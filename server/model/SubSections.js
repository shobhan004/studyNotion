const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // Video ka duration yahan store karenge (jaise '10h 20m' UI me dikhane ke liye)
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    // Cloudinary ya AWS S3 se aane wala secure video URL
    videoUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("SubSection", subSectionSchema);