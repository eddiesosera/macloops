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
    profile_image: {
        type: String,
        required: false,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "customer"
    },
    cart_items: [
        {
            type: String,
            default: ""
        }
    ],
    bought_items: [
        {
            type: String,
            default: ""
        }
    ],
    liked_items: [
        {
            type: String,
            default: ""
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);
