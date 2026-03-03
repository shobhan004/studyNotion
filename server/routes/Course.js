const express = require("express");
const { auth } = require("../middlewares/auth");
const {createCourse ,addToCart , removeFromCart , getCourses , deleteCourse , getInstructorCourses  , getAllCourses, getFullCourseDetails , editCourse} = require('../controllers/Course');
const {createCategory , showAllCategories} = require('../controllers/Categories');
const {createSubSection , deleteSubSection}   = require("../controllers/SubSection");
const {createSection , deleteSection , updateSection} = require('../controllers/Section'); 
const router = express.Router();


const {isAdmin , isInstructor} = require('../middlewares/auth');
router.post("/createCourse" , auth , createCourse);
router.post("/addToCart", auth, addToCart);
router.get("/getCourse" , auth , getCourses);
router.post("/createCategory", auth, createCategory);
router.get("/showAllCategories" , showAllCategories);
router.get("/getAllCourses" , getAllCourses);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// routes/Course.js


router.post("/createSection" , createSection);
router.post("/addSubSection" , createSubSection);

// createCourse ke niche ya deleteCourse ke upar ye line add karo
router.post("/editCourse", auth, isInstructor, editCourse);
// POST hi rakho, standard hai is project ke liye because ham courseid bhej rhe hai
router.post("/getFullCourseDetails", auth , getFullCourseDetails);
router.post("/updateSection", auth, isInstructor, updateSection);

// DELETE SECTION

router.delete("/deleteCourse" , auth , deleteCourse);
router.delete("/removeFromCart", auth, removeFromCart);
router.post("/deleteSection" , auth , isInstructor , deleteSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


module.exports = router;
