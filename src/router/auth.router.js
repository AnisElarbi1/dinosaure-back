const authController = require('../controller/auth.controller');
const express = require('express');
var router = express.Router();
router.post('',authController.login);

module.exports = router ;