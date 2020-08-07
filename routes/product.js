const express = require("express");
const router = express.Router();
const userController = require("../controller/product");
const {
    productValidationRules,
    validation
} = require("../middleware/validation")

router.post('/create', productValidationRules(), validation, userController.addProduct);
router.get('/', userController.getProducts);



module.exports = router;