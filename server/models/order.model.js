const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            type: String,
            required: true,
        }
    ],
    quantity: {
        type: Number,
        required: true
    },
});

OrderSchema.pre(/^find/, function (next) {
    this.populate({
        path: "customer",
        select: ""
    });
    next();
});

module.exports = mongoose.model("Order", OrderSchema);