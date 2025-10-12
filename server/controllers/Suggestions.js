
const Suggestion = require("../model/Suggestion");
const SubmitSuggestion = async(req , res) =>{
  try{
    const{
        firstname ,
        lastname,
        email,
        phonenumber,
        message
    } = req.body;

    if(! firstname ||
       !lastname||
       !email||
       !phonenumber||
       !message){
        return res.status(200).json({
            success : false,
            message : "Cannot fetch data ",
        })
       }
      
     const result = await Suggestion.create({
        firstname ,
        lastname,
        email,
        phonenumber,
        message,
     });
    
     return res.status(200).json({
      success : true,
      message : "Suggestion added sucessfully",
     })

  }catch(error){
    return res.status(500).json({
        success : false,
        message : "Something went wrong",
    })
  }
}

module.exports = {SubmitSuggestion};