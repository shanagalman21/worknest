const jwt = require("jsonwebtoken"); // Import jsonwebtoken to verify JWT
const User = require("../models/User"); // Import User to query database 

// Create middleware function to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization; // Extract auth letter
        if (token && token.startsWith("Bearer")) { // Check if token exists and starts with "Bearer"
            token = token.split(" ")[1]; // Extracts only the token, excluded Bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET
            req.user = await User.findById(decoded.id).select("-password"); // Fetch the user from the database using Id
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token" }); 
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message }); 
    }
};

// Middleware for admin-only access
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only."});
    }
};

module.exports = { protect, adminOnly};
