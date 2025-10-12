const Profile = require("../model/Profile");
const User = require('../model/User');
 
//  bhai update isliye kyuki pehle apan ne null kri thi isliye ab update kr rhe hain
exports.updateProfile = async(req , res) => {
 try{ 
    const {dateOfBirth="" ,about="",contactNumber , gender} = req.body;

    const id =req.user.id;
    if(!contactNumber ||!contactNumber ||!gender ){
        return res.status(401).json({
            success : false,
            message : "Please enter valid details",
        })
    }
    
    const UserDetails = await User.findById(id);
    const ProfileId = UserDetails.additionalDetails;
    const profileDetails = await Profile.findById(ProfileId);

    // yaha pr object bana huya tha islye second method save krna wala use krenge yaha pr
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    return res.status(401).json({
        success : true,
        message :"Profile Updated Successfully",
        profileDetails,
    })
 }catch(err){
     return res.status(401).json({
        success : false,
        message : "something went wrong",
     })

 }
}

exports.deleteAccount = async(req, res) =>{
    try{
       const id = req.user.id;

       const userDetails = await User.findById(id);
       if(!userDetails){
        return res.status(401).json({
            success:false,
            message: "User Not found",
        });
       }

       await Profile.findByIdAndDelete({id:userDetails.additionalDetails});

       await User.findByIdAndDelete({id:id});
    //    hw remove user from enrolled user
    // search krooo courses ke model me hai dekhna isse
    return res.status(200).json({
        success :true,
        message : "Ssuccessfully deleted",
    })
    }
    catch(err){
        console.log(err);
        return res.status(200).json({
           success : true,
          message : "something wrong "
        })
          
    }
}
exports.getAllUserDetails =  async (req,res) =>{

    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success : true,
            message : "User data fetched successfully",
        })

    }catch(err){
         return res.status(200).json({
            success : false,
            message : "something went wrong",
        })
    }
}

exports.getUsername = async(req, res) =>{
    try{
        const id = req.user.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"could not get id",
            })
        }
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message:"could not get userDetails",
            })
        }
        const firstname = userDetails.firstname;
        const lastname = userDetails.lastname;
        const username = `${firstname}${lastname}`;

        if(!username){
            console.log("can not finf username");
            return res.status(400).json({
                success:false,
                message:"username not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"username founded successfully",
            username,
        })


    }catch(err){
        console.log(err);
         return res.status(400).json({
                success:false,
                message:"something went wrong"
            })
    }
}