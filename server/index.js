const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const database = require("./config/database");
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const suggestionRoutes = require("./routes/Suggestion");
const paymentRoutes = require("./routes/Payments");
const PORT = process.env.PORT || 4000;
const profileRoutes = require("./routes/Profile");
const { LogOut } = require("lucide-react");

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000" , "http://localhost:3001" ,  /\.vercel\.app$/],
  credentials: true,
}));



// Route setup
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/suggestions" ,suggestionRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/profile" , profileRoutes);



// Database se connect hone ke baad hi server ko start karein
const startServer = async () => {
  try {
    // Wait for the database connection to complete
    await database.connect(); 

    // Once the connection is successful, start the server
    app.listen(PORT, () => {
      console.log(`✅ Server is up and running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to the database and start the server:", err);
    process.exit(1); // Exit the application if database connection fails
  }
};

// Call the function to begin the process
startServer();