const express = require("express");
const router = express.Router();

// 1. Middleware Import
const { auth, isInstructor } = require("../middlewares/auth");
const {getEnrolledCourses} = require("../controllers/Profile");

// 2. Controllers Import (SABKO ek sath dhyan se import karo)
const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    getUsername,
    instructorDashboard,
    updateDisplayPicture
} = require("../controllers/Profile");

// ── 3. ROUTES (Line Numbers check kar lena) ──

// Profile update aur delete
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateDisplayPicture" , auth , updateDisplayPicture);
// Data fetching
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses" ,auth, getEnrolledCourses);
router.get("/getusername", auth, getUsername);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;