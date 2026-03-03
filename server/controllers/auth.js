const OTP = require("../model/OTP");
const Profile = require("../model/Profile");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_SECRET = "92ae91a1ebe5ce3e170175fc5beff16c34949cb954accb16a8b7e9ae1aac0db7ff0721a1baec8ed2aa131f1c06cc93bc3899efd3f693139a7d790df185633fe9";

exports.sendOtp = async (req ,res) =>{
    
    try{
          const {email} = req.body;

    const check = await  User.findOne({email});

    if(check){
        return res.status(401).json({
            sucess : false,
            message : "User already existed",
        });
    }
    
    var otp = otpGenerator.generate(6,{
        lowerCaseAlphabets : false,
        upperCaseAlphabets : false,
        specialChars : false,
    })
    // checking ki pehele se hai kya ye unique hai ya nhi
    let result =  await OTP.findOne({otp : otp});
    // sirf ({otp}) bhi likh skte hai

    while(result){
       otp = otpGenerator.generate(6,{
        lowerCaseAlphabets : false,
        upperCaseAlphabets : false,
        specialChars : false,
    })

     result =  await OTP.findOne({otp : otp});
    }

    const otpbody = await OTP.create({
        email,
        otp,
    })
    console.log(otpbody);

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            sucess : false,
            message : "Verification failed",
        })
    }
}

exports.signUp = async (req, res) => {
    console.log("SIGNUP BODY:", req.body);
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            accountType, // Ise uncomment kar diya!
            // otp // Abhi OTP commented rakhte hain testing ke liye
        } = req.body;
        // req.body ek object hota hai jisme fronted se data aata hai
        // inko hum as it is inhi name se use kr skte hai aage

        // 1. Validation for all fields
        if (!firstname || !lastname || !email || !password || !confirmpassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2. 🚨 FIX: Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered. Please sign in.",
            });
        }

        /* ====================================================
        OTP LOGIC (Abhi commented hai, baad mein chalayenge)
        ====================================================
        */

        // 4. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. 🚀 PRO MOVE: Create an empty profile for the user
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // 6. Create Default Avatar using DiceBear API
        const defaultImage = `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`;

        // 7. Create User in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            accountType: accountType || "Student", // Default to Student if not provided
            additionaldetails: profileDetails._id, // Linking the blank profile
            image: defaultImage, // Assigning the generated avatar
        });

        // 8. Return Success Response
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again.",
        });
    }
};


exports.logIn = async(req, res) =>{
try{
    console.log("Body check:", req.body);
    const{email , password} = req.body;

     if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    const cleanEmail = email.trim().toLowerCase();
    
    const user = await User.findOne({email : cleanEmail});

     console.log("user ke pehle" , user);
    if(!user){
        return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }
     
    console.log("user ke baad");
    // jwt jason web token give digital id card to the user
   
    if(await bcrypt.compare(password , user.password)){
        const token = jwt.sign({
            email:user.email , id:user._id, accountType:user.accountType
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"24H",
        }
    )
    //   iska kaam database me store krna nhi hai no need to store the token in database for verification
    // verification is done by signature secret key
     user.token = token
    //   user.password ko undefined esiliye kiya hai kyuki success ke baad apan body me bhejenge
    // jisse user ko login ke baad saara data image porfile pr mil ske
    // tu password na chala jaye issi liye
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // for security reasons httponly is used
        httpOnly: true,
      }
    //   cookies are sent to webbrowser
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    }
     else {
        return res.status(401).json({
            success: false,
            message: `Password is Incorrect`,
        });
    }
}catch(err){
  console.error(err)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
}
}

exports.signOut = async(req , res)=>{
try{
res.clearCookie("token");
res.status(200).json({
    success:true,
    message:"Sign out successfully",
})
}catch(error){
    res.status(400).json({
        success:false,
        message:"Cannot perform signout",
    })
}
}