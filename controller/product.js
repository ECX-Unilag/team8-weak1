const jwt = require("jsonwebtoken");
const Product = require('../model/product');
const Log = require('../model/log');
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");

exports.addProduct = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const newProduct = await Product.create(req.body);
        const logObject = {
            user: id,
            action: "Add Product",
            product: newProduct._id,
            quantity: newProduct.quantity,
        }
        const log = await Log.create(logObject);
        return successResMsg(res, 201, newProduct);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const Products = await Product.find().sort({
            date: 'desc'
        });;
        return successResMsg(res, 200, Products);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const oldProduct = await Product.findById({
            _id: req.params.id
        });
        const newcount = oldProduct.quantity + req.body.quantity
        console.log(newcount)
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            category: req.body.category,
            quantity: newcount
        }, {
            new: true,
        });

        const logObject = {
            user: id,
            action: "Update Product",
            product: product._id,
            quantity: product.quantity,
        }
        const log = await Log.create(logObject);
        return successResMsg(res, 200, product);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const product = await Product.findByIdAndDelete({
            _id: req.params.id
        })
        const logObject = {
            user: id,
            action: "Delete Product",
            product: product._id,
            quantity: product.quantity,
        }
        const log = await Log.create(logObject);
        return successResMsg(res, 200, product);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}