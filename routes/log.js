const express = require("express");
const router = express.Router();
const userController = require("../controller/log");
const auth = require("../middleware/auth");

router.get('/', auth.authentication("admin", "supervisor"), userController.getLog);
router.get('/:id', auth.authentication("user", "supervisor", "admin"), userController.getUserLog);
router.patch('/:id', auth.authentication("supervisor", "admin"), userController.updateLog);




module.exports = router;