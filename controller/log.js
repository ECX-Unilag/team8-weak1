const jwt = require("jsonwebtoken");
const Log = require('../model/log');
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");


exports.getLog = async (req, res) => {
    try {
        const Logs = await Log.find().populate("user").populate("product").sort({
            date: 'desc'
        });
        return successResMsg(res, 200, Logs);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}


exports.getUserLog = async (req, res) => {
    try {
        console.log(req.params.id)
        const Logs = await Log.find({
            user: req.params.id
        }).populate("user").populate("product").sort({
            date: 'desc'
        });
        return successResMsg(res, 200, Logs);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.updateLog = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;

        const logdetail = await Log.find({
            _id: req.params.id
        }).populate("user").populate("product");
        const log = await Log.findByIdAndUpdate(req.params.id, {
            status: "true",
        }, {
            new: true,
        });


        const logObject = {
            user: id,
            action: "Confirmed Product",
            product: logdetail[0].product._id,
            quantity: logdetail[0].product.quantity,
        }
        const log1 = await Log.create(logObject);
        return successResMsg(res, 200, log);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}