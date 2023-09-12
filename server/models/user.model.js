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
    phone_number: {
        type: Number,
        default: 78951336
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
    address:
    {
        house_number: {
            type: String,
            default: 12
        },
        street_name: {
            type: String,
            default: "KwaMbudzi Road"
        },
        city: {
            type: String,
            default: "Johannesburg"
        },
        zip_code: {
            type: String,
            default: 1738
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
