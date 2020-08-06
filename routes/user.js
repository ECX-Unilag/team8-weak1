const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const {signUpValidationRules, validation} = require("../middleware/validation")



router.post('/signup', signUpValidationRules(), validation, userController.signUp);




module.exports = router;