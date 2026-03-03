const express = require("express");
const router = express.Router();
const { createRating, getAllRatings } = require("../controllers/rating&review");
const { auth } = require("../middlewares/auth"); // your existing auth middleware

router.post("/create", auth, createRating);   // POST /api/v1/rating/create
router.get("/getAll", getAllRatings);          // GET  /api/v1/rating/getAll  (Public)

module.exports = router;