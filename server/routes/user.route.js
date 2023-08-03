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
      res.send("User logged in!");
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

//Create
router.post("/api/addUser", async (req, res) => {
  const user = new UserSchema({ ...req.body });
  await user
    .save()
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
