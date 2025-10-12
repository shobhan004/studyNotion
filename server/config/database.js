// database.js
const mongoose = require("mongoose");
require("dotenv").config();

// Export the async function directly
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connection established successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err; // Re-throw the error so index.js can catch it and exit
  }
};

module.exports = { connect };