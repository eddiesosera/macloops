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
        };

        // Extract the order items from the request body
        const orderItems = req.body.items;

        // Create a new order with the associated customer (user) data
        const order = new OrderSchema({
            customer: user, // Using the user data
            items: orderItems
        });

        // Save the order to the database
        const savedOrder = await order.save();

        res.json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: "Error creating order." });
    }
});

// Get All Orders
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

// Get Single Orders
router.get("/api/order/:id", verifyToken, async (req, res) => {
    try {
        // const userId = req.user.userId;

        // userId to find orders associated with the user
        const findSingleOrder = await OrderSchema.findById(req.params.id);

        res.json(findSingleOrder);
    } catch (error) {
        res.status(500).json({ error: "Error fetching orders." });
    }
});

//Update Order, Excludes id parameter as it automatically updates
router.patch("/api/updateOrder/:id", verifyToken, async (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL parameters

    try {
        // Create an object containing the fields to update (excluding _id)
        const updatedFields = { ...req.body };
        delete updatedFields._id; // Remove _id if it's present in the request body

        // Update the order document by ID
        const result = await OrderSchema.updateOne({ _id: orderId }, { $set: updatedFields });

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Order not found or no changes made." });
        }

        res.json({ message: "Order updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error updating the order." });
    }
});

//Delete Order
router.delete("/api/deleteOrder/:id", verifyToken, async (req, res) => {
    const { id } = req.params.id;
    await OrderSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;