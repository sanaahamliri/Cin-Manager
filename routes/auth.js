
const express = require('express');
const { register, login } = require('../controllers/authController');
const { requestPasswordReset } = require('../controllers/resetPasswordController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);


module.exports = router;
