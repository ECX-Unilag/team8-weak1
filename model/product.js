const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please provide the product category"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide the product description"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please provide the product image"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide your phone number"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide your quantity"],
    },
    remarks: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;