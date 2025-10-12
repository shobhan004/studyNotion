const express = require("express");
const router = express.Router();
const  {SubmitSuggestion} = require('../controllers/Suggestions');
router.post("/submitSuggestions" , SubmitSuggestion);

module.exports = router