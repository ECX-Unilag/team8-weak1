const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    action: {
        type: String,
    },
    product: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const Log = mongoose.model("Log", logSchema);

module.exports = Log;