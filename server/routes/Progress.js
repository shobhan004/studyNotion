const express = require("express");
const router = express.Router();
const {updateCourseProgress} = require('../controllers/courseProgress');
const {auth} = require('../middlewares/auth');


router.post('/updateCourseProgress' ,auth ,  updateCourseProgress);


module.exports = router;