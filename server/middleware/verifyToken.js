const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require('dotenv').config({ path: '../.env' });

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify and decode the JWT token
function verifyToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify and decode the token
        req.user = decoded; // Store the user information in the request object
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
}

module.exports = verifyToken;
