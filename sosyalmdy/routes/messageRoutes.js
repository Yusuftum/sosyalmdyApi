const express = require('express');
const { sendMessage, getReceivedMessages, getSentMessages } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Mesaj gönderme
router.post('/', protect, sendMessage);

// Kullanıcıya gelen mesajları listeleme
router.get('/received', protect, getReceivedMessages);

// Kullanıcı tarafından gönderilen mesajları listeleme
router.get('/sent', protect, getSentMessages);

module.exports = router;
