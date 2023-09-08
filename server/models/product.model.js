const mongoose = require("mongoose");

const InstrumentSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    image_cover:
    {
        type: String,
        default: ""
    },
    images: [
        {
            type: String,
            default: ""
        }
    ],
    slogan: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        // required: true,
        default: ""
    },
    description: {
        type: String,
        // required: true
    },
    manufacturer: {
        type: String,
        // required: true
    },
    specifications: {
        dimensions: {
            dimensions_unit: {
                type: String,
                default: "cm"
            },
            weight_unit: {
                type: String,
                default: "kg"
            },
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            },
            depth: {
                type: Number,
                default: 0
            },
            weight: {
                type: Number,
                default: 0
            }
        },
        color: {
            type: String
        }
    },
    year: {
        type: Number,
        default: 0
    },
    price: {
        type: String,
        // required: true
    },
    rating: [{
        type: Number,
        default: 0
    }],
    quantityAvailable: {
        type: Number,
        default: 10
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Instrument", InstrumentSchema);
