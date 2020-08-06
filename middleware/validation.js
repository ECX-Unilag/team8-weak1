const {
    body,
    validationResult
} = require('express-validator');

exports.signUpValidationRules = () => {
    return [
        // username must be an email
        body("firstName").notEmpty().isLength({
            min: 3
        }).isAlpha().trim().escape().withMessage("Name must have more than 3 characters"),
        body("lastName").notEmpty().isLength({
            min: 3
        }).isAlpha().trim().escape().withMessage("Name must have more than 3 characters"),
        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().isLength({
            min: 5
        }).withMessage("Password must have at least 5 characters"),
        body("passwordConfirm").notEmpty().isLength({
            min: 5
        }).withMessage("Password must have at least 5 characters"),
        body("role").notEmpty().isAlpha(),
        body("phoneNumber").notEmpty().matches(/^[0][0-9]{10}$/),
    ]
}


exports.loginValidationRules = () => {
    return [

        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is Required")
    ]
}



exports.validation = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({
            [err.param]: err.msg
        }))

        return res.status(422).json({
            errors: extractedErrors,
        })

    } catch {
        res.status(401).json({
            error: "Unauthorized",
            status: "error"
        })
    }
}