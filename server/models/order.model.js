const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product_id: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            }
        }
    ],
    orderStatus: {
        type: String,
        enum: ["Pending", "Processed", "Delivered", "Cancelled"],
        default: "Pending"
    },
    deliveryDate: {
        type: Date,
        default: function () {
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
            return oneWeekFromNow;
        }
    }
});

OrderSchema.pre(/^find/, function (next) {
    this.populate({
        path: "customer",
        select: ""
    });
    next();
});

// Define a pre-save middleware to update the "status" field
OrderSchema.pre("save", function (next) {
    const currentDate = new Date();
    if (currentDate > this.deliveryDate && this.orderStatus === "Pending") {
        this.orderStatus = "Delivered";
    }
    next();
});

module.exports = mongoose.model("Order", OrderSchema);