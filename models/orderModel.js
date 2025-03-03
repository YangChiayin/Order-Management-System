const mongoose = require("mongoose");

// Create a schema
const orderSchema = new mongoose.Schema({
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    address: { type: String },
    products: { type: Array },
    shippingCharge: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0.13 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

// Create a model
const Order = mongoose.model("orders", orderSchema);

// Export the model
module.exports = {
    Order
};