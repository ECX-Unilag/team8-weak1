const express = require("express");
const router = express.Router();
const userController = require("../controller/log");
const auth = require("../middleware/auth");

router.get('/', auth.authentication("admin"), userController.getLog);



module.exports = router;