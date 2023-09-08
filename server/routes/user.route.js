const express = require("express");
const multer = require("multer");
const UserSchema = require("../models/user.model");
const router = express();

const jwt = require("jsonwebtoken");

const upload = multer({ dest: "uploads/" });

const JWT_SECRET_KEY = "dv_200_term_4";

// Login user and return a JWT token
router.post("/api/loginUser", async (req, res) => {

    try {
        const findUser = await UserSchema.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (findUser) {

            // Exclude the 'password' property from the user object
            const { password, ...userWithoutPassword } = findUser._doc;

            // Generate a JWT token
            const token = jwt.sign({ userId: findUser._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
            res.json({ user: userWithoutPassword, token });
        } else {
            res.status(401).json({ error: "Invalid credentials." });
        }
    } catch (error) {
        res.status(500).json({ error: "User login failed." });
    }
});

//Read All
router.get("/api/getUsers", async (req, res) => {
    const findUser = await UserSchema.find();
    res.json(findUser);
});

//Get Single User
router.get("/api/getUser/:id", async (req, res) => {
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});

//Create
router.post("/api/addUser", async (req, res) => {
    try {
        const user = new UserSchema({ ...req.body });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "User registration failed." });
    }
});

//Update
router.patch("/api/updateUser/:id", async (req, res) => {
    const { id } = req.params.id;
    await UserSchema.updateOne({ id }, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

//Delete
router.delete("/api/deleteUser/:id", async (req, res) => {
    const { id } = req.params.id;
    await UserSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
