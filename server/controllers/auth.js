const OTP = require("../model/OTP");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_SECRET = "92ae91a1ebe5ce3e170175fc5beff16c34949cb954accb16a8b7e9ae1aac0db7ff0721a1baec8ed2aa131f1c06cc93bc3899efd3f693139a7d790df185633fe9";

exports.sendOtp = async (req ,res) =>{
    
    try{
          const {email} = req.body;

    const check = User.findOne({email});

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

exports.signUp = async (req ,res) =>{

    
    console.log("SIGNUP BODY:", req.body);
    try{
        const{
         firstname,
         lastname,
         password,
         confirmpassword,
         email,
        //  otp,
        //  contactnumber,     
        //  additionaldetails,
        //  accountType
        } = req.body;
        
        console.log("📝 Extracted Data:", { firstname, lastname, email, password, confirmpassword });

        if(!firstname || !lastname || !password ||!confirmpassword || !email){
            console.log("Missing a required field. The received body is:", req.body);
            return res.status(401).json({
              success: false,
              message : "Please enter valid details",
            }); 
        }

        // FindOne  always takes object as an input

        const check = await User.findOne({email});

        if(check){
            return res.status(401).json({
                success : false,
                message : "email already registerd",
            })
        }

        // find top most otp stored in database

        // const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        // // bhai createdat -1 ka mtlb sbse recent dena and limit(1) ka mtlb bs ek hi dena
        // console.log(recentOtp);
        
        // if(recentOtp.otp.length == 0){
        //     return res.status(401).json({
        //         sucess : false,
        //         message : "OTP is not matched",
        //     })
        // }
        // if(recentOtp.otp != otp){
        //     return res.status(401).json({
        //         sucess : false,
        //         message : "OTP is not matched",
        //     })
        // }

        // hash password
        const hashedpassword = await bcrypt.hash(password , 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            // contactnumber: contactnumber || "",
            password: hashedpassword,
            // additionaldetails: additionaldetails || "",
            // accountType: accountType || "Student"
        })

        return res.status(200).json({
            success : true,
            message : "signed up successfully",
        })

    }catch(err){
        console.log(err);
        res.status(404).json({
            sucess : false,
            message : 'signup failed',
        } )
    }
}


exports.logIn = async(req, res) =>{
try{
    const{email , password} = req.body;

     if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }
    
    const user = await User.findOne({email : email});
    
    if(!user){
        return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }
   
    if(await bcrypt.compare(password , user.password)){
        const token = jwt.sign({
            email:user.email , id:user._id, role:user.role
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