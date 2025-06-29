const express = require('express');
const router = express.Router();
const { signup, googleSignup } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/google-signup', googleSignup); // for future use

module.exports = router;
