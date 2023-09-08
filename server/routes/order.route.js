const express = require("express");
const OrderSchema = require("../models/order.model");
const UserSchema = require("../models/user.model");
const router = express();
const verifyToken = require("../middleware/verifyToken")

//Get All
router.get("/api/orders/", async (req, res) => {
    const findOrder = await OrderSchema.find();
    res.json(findOrder);
});

//Create
router.post("/api/createOrder", verifyToken, async (req, res) => {
    try {
        // Get the user ID from the decoded token
        const userId = req.user.userId;

        // Fetch the user data (excluding password) from the database
        const user = await UserSchema.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Create a new order with the associated customer (user) data
        const order = new OrderSchema({
            customer: user, // Use the user data
            product: req.body.product,
            quantity: req.body.quantity,
        });

        // Save the order to the database
        const savedOrder = await order.save();

        res.json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: "Error creating order." });
    }
});

// Get all orders
router.get("/api/orders", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // userId to find orders associated with the user
        const findOrder = await OrderSchema.find({ customer: userId });

        res.json(findOrder);
    } catch (error) {
        res.status(500).json({ error: "Error fetching orders." });
    }
});

module.exports = router;