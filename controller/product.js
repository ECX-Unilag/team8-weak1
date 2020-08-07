const Product = require('../model/product');
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");

exports.addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        return successResMsg(res, 201, newProduct);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        return successResMsg(res, 200, Products);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return successResMsg(res, 200, product);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({
            _id: req.params.id
        })
        return successResMsg(res, 200, product);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}