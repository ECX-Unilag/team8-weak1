const jwt = require("jsonwebtoken");
const Category = require('../model/category');
const Log = require('../model/log');
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");


exports.addCategory = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const newCategory = await Category.create(req.body);
        const logObject = {
            user: id,
            action: "Add Category",
            product: newCategory._id,
            quantity: newCategory.quantity,
        }
        const log = await Log.create(logObject);
        return successResMsg(res, 201, newCategory);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getCategory = async (req, res) => {
    try {
        const Categories = await Category.find();
        return successResMsg(res, 200, Categories);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}