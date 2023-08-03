const mongoose = require("mongoose");

const InstrumentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
    specifications: {
    type: String,
    required: true
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
