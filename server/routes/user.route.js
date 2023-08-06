const express = require("express");

const UserSchema = require("../models/user.model");

const router = express();

//Login user
router.post("/api/loginUser", async (req, res) => {
    const findUser = await UserSchema.findOne({
        email: req.body.email
    });
    const findUsername = await UserSchema.findOne({
        username: req.body.username
    });

    if (findUsername != null || findUser != null) {
        if (findUsername?.password == req.body.password || findUser?.password == req.body.password) {
            // res.send("User logged in!");
            const usr = [findUsername?.id,
            findUsername?.fullname,
            findUsername?.role,
            findUsername?.username,
            findUsername?.email,
            findUsername?.profile_image,
            findUsername?.cart_items,
            findUsername?.bought_items,
            findUsername?.liked_items,
            ]
            res.send(usr)
        } else {
            res.send("Email and password does not match!");
        }
    } else {
        res.send("User does not exist");
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
    const user = new UserSchema({ ...req.body });
    await user
        .save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
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
