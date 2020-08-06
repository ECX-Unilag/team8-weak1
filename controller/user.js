const User = require('../model/user');
const jwt = require("jsonwebtoken");
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");

exports.signUp = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return errorResMsg(res, 423, "This user already exists");
        }
        const newUser = await User.create(req.body);
        return successResMsg(res, 201, newUser);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}


exports.logIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findOne({
            email
        }).select("+password");
        if (!user || !(await user.correctPassword(password, user.password))) {
            return errorResMsg(res, 401, "Incorrect email or password");
        }

        const token = jwt.sign({
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );
        const data = {
            id: user._id,
            role: user.role,
            token
        }
        return successResMsg(res, 200, data);

    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}