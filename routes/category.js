const express = require("express");
const router = express.Router();
const userController = require("../controller/category");
const {
    productValidationRules,
    validation
} = require("../middleware/validation")
const auth = require("../middleware/auth");

router.get('/', auth.authentication("user","supervisor","admin"), userController.getCategory);
router.post('/', auth.authentication("user","supervisor","admin"), userController.addCategory);


module.exports = router;