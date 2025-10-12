
const mongoose = require("mongoose");

const suggestionschema = new mongoose.Schema({
    firstname : {
     type: String,
    },
    lastname : {
        type : String,
    },
    email : {
        type: String,
    },
    phonenumber :{
        type :String,
        required : true,
    },
    message :{
        type : String,
        
    }


})

module.exports = mongoose.model("Suggestion" , suggestionschema);