
const express = require("express");
const router = express.Router();

const {resetPassword , resetPasswordToken} = require("../controllers/ForgetPassword");
const {signUp, logIn ,signOut} = require("../controllers/auth")


router.post("/reset-password-token", resetPasswordToken );
router.post("/reset-password" , resetPassword);
// sign up reques
router.post("/signup" , signUp);
router.post("/login" , logIn);
router.post("/logOut" , signOut);

module.exports = router 