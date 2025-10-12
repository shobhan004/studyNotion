const express = require("express");
const { auth } = require("../middlewares/auth");
const {createCourse ,addToCart , getCourses , deleteCourse} = require('../controllers/Course');
const router = express.Router();

router.post("/createCourse" , auth , createCourse);
router.post("/addToCart", auth, addToCart);
router.get("/getCourse" , auth , getCourses);
router.delete("/deleteCourse" , auth , deleteCourse);
module.exports = router;