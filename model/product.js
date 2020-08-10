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
        trim: true,
        default: ""
    },
    quantity: {
        type: Number,
        required: [true, "Please provide your quantity"],
        default: 0
    },
    remarks: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;