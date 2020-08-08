const express = require("express");
const router = express.Router();
const userController = require("../controller/product");
const {
    productValidationRules,
    validation
} = require("../middleware/validation")
const auth = require("../middleware/auth");

router.get('/', auth.authentication("supervisor","admin"), userController.getProducts);
router.post('/', auth.authentication("user","supervisor","admin"), productValidationRules(), validation, userController.addProduct);
router.patch('/:id', auth.authentication("user","supervisor","admin"), productValidationRules(), validation, userController.updateProduct);
router.delete('/:id', auth.authentication("user","supervisor","admin"), userController.deleteProduct);



module.exports = router;