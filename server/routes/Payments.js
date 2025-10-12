const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");
const {capturePayment ,verifyPayment , sendPaymentSuccessmail} = require("../controllers/payment");

console.log({ capturePayment, verifyPayment, sendPaymentSuccessmail });
router.post("/capturepayment" , auth , capturePayment);
router.post("/verifyPayment" , auth , verifyPayment );
router.post("/successmail" , auth , sendPaymentSuccessmail);

module.exports = router;