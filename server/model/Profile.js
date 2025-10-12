const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    dateOfBirth : {
        type : String,

    },
    gender : {
        type : String,
    },
    ContactNumber : {
        type : String,
        trim : true,
    },


})

module.exports = mongoose.model("Profile" , profileSchema);
