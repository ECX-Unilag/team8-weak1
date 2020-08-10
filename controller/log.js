const Log = require('../model/log');
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");


exports.getLog = async (req, res) => {
    try {
        const Logs = await Log.find().populate("user").populate("product")
        return successResMsg(res, 200, Logs);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}


exports.getUserLog = async (req, res) => {
    try {
        console.log(req.params.id)
        const Logs = await Log.find({ user: req.params.id}).populate("user").populate("product")
        return successResMsg(res, 200, Logs);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

