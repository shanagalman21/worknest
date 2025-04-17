require("dotenv").config();         // Load environment variables from .env 
const express = require("express"); // Imports express to create server and APIs
const cors = require("cors");       // Import cors middleware to handle interaction between frontend and backend
const path = require("path");       // Import path module
//const { connect } = require("http2");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();              // Create express app instance

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;      // Use PORT from .env if available, otherwise use 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start express server 
