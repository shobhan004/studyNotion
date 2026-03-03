const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
    },
    // Ek section ke andar multiple videos/lessons (SubSections) honge
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection",
        },
    ],
});

module.exports = mongoose.model("Section", sectionSchema);