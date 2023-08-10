const mongoose = require("mongoose");

const InstrumentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            default: ""
        }
    ],
    slogan: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    specifications: {
        dimensions: {
            width: {
                type: String,
                default: ""
            },
            height: {
                type: String,
                default: ""
            },
            depth: {
                type: String,
                default: ""
            },
            weight: {
                type: String,
                default: ""
            }
        }
    },
    year: [
        {
            type: Number,
            default: 0
        }
    ],
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        default: 0
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
