const express = require("express");

const ProductSchema = require("../models/product.model");

const router = express();

//Get All
router.get("/api/products/", async (req, res) => {
    const findProduct = await ProductSchema.find();
    res.json(findProduct);
});

//Get Single Product
router.get("/api/product/:id", async (req, res) => {
    const findProduct = await ProductSchema.findById(req.params.id);
    res.json(findProduct);
});

//Update
router.patch("/api/product/:id", async (req, res) => {
    const { id } = req.params.id;
    await ProductSchema.updateOne({ id }, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

//Create
router.post("/api/product", async (req, res) => {
    console.log("Cars");
    const product = new ProductSchema({ ...req.body });
    await product
        .save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

//Delete
router.delete("/api/product/:id", async (req, res) => {
    const { id } = req.params.id;
    await ProductSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
