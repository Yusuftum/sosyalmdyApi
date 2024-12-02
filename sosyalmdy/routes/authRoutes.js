const express = require('express');
const { register, login, registerAdmin } = require('../controllers/authController');
const router = express.Router();

//gönderi gönderme 
router.post('/register', register);
//admin girişi
router.post('/login', login);
//admin kaydı
router.post('/registerAdmin', registerAdmin);

module.exports = router;
