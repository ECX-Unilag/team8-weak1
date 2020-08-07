const express = require("express");
const router = express.Router();
const userController = require("../controller/product");
const {
    productValidationRules,
    validation
} = require("../middleware/validation")

router.get('/', userController.getProducts);
router.post('/', productValidationRules(), validation, userController.addProduct);
router.patch('/:id', productValidationRules(), validation, userController.updateProduct);




module.exports = router;