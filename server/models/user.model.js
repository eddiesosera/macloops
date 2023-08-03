const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
      },
    username: {
    type: String,
    required: true
  },
    email: {
    type: String,
    required: true
  },
    password: {
    type: String,
    required: true
  },
    role: {
    type: String,
    required: true
  },
  cart_items: {
    type: String,
    required: false
  },
  bought_items: {
    type: String,
    required: true
  },
  liked_items: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
