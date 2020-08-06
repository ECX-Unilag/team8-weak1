const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");

exports.authentication = (...roles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const role = decodedToken.role;
            if (!roles.includes(role)) {
                return responseHandler(res, 'unauthorized', 401, false, "error");
            } else {
                next();
            }
        } catch {
            return responseHandler(res, 'unauthorized', 401, false, "error");
        }
    };
};