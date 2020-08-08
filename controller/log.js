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