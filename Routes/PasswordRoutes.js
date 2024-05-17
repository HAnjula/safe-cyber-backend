// Routes/PasswordRoutes.js
const express = require('express');
const { checkPasswordStrength } = require('../Controller/PasswordController');

const router = express.Router();

router.post('/strength', checkPasswordStrength);

module.exports = router;
