const mongoose = require("mongoose");

const InstrumentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            default: false
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
                default: false
            },
            height: {
                type: String,
                default: false
            }
        }
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Instrument", InstrumentSchema);
