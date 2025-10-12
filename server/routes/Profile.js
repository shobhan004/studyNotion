const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");
const {getUsername} = require("../controllers/Profile");

router.get("/getusername" , auth ,getUsername );
module.exports = router;