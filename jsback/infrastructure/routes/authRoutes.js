const express = require('express');
const router = express.Router();
const authController = require('../../interfaces/controllers/AuthController.js');

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/change-password', authController.changePassword.bind(authController));

module.exports = router; 