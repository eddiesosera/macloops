const express = require("express");

const ProductSchema = require("../models/product.model");
const verifyToken = require("../middleware/verifyToken");

const router = express();

//Get All Products
router.get("/api/products/", async (req, res) => {
    const findProduct = await ProductSchema.find();
    res.json(findProduct);
});

//Get Single Product
router.get("/api/product/:id", async (req, res) => {
    const findProduct = await ProductSchema.findById(req.params.id);
    res.json(findProduct);
});

//Update Product
router.patch("/api/product/:id", async (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL params

    try {
        const updatedProduct = await ProductSchema.findByIdAndUpdate(
            productId,
            { $set: req.body }, // Use $set to update only the specified fields
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error updating the product" });
    }
});

//Create Product
router.post("/api/product", async (req, res) => {
    console.log("Cars");
    const product = new ProductSchema({ ...req.body });
    await product
        .save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

//Delete Product
router.delete("/api/product/:id", verifyToken, async (req, res) => {
    const { id } = req.params.id;
    await ProductSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
