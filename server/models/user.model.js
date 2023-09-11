const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
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
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "customer"
    },
    adress:
    {
        house_number: {
            type: String
        },
        street_name: {
            type: String
        },
        city: {
            type: String
        },
        zip_code: {
            type: String
        }
    },
    cart_items: [
        {
            product_id: {
                type: String,
                default: ""
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    bought_items: [
        {
            product_id: {
                type: String,
                default: ""
            },
        }
    ],
    liked_items: [
        {
            product_id: {
                type: String,
                default: ""
            },
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);
