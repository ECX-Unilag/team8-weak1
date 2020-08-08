const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const {signUpValidationRules, loginValidationRules, validation} = require("../middleware/validation")



router.post('/signup', signUpValidationRules(), validation, userController.signUp);
router.post('/login', loginValidationRules(), validation, userController.logIn);



module.exports = router;