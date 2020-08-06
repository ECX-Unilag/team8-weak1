const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the category name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide the category description"],
        trim: true,
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;