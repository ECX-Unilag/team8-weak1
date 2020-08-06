const User = require('../model/user');
const jwt = require("jsonwebtoken");
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");

exports.signUp = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user){
            return errorResMsg(res, 423, "This user already exists");
        }
        const newUser = await User.create(req.body);
        return successResMsg(res, 201, newUser);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}