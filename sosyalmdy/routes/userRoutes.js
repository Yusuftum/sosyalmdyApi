const express = require('express');
const { getUserProfile, updateUserProfile, deleteUser, getUsers, getUserById } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

// Tüm kullanıcıları listeleme (Admin yetkisi gerektirir)
router.get('/', protect, authorize(['admin']), getUsers);

// Belirli bir kullanıcıyı bulma (Admin yetkisi gerektirir)
router.get('/:id', protect, authorize(['admin']), getUserById);

// Kullanıcı profilini alma
router.get('/profile', protect, getUserProfile);

// Kullanıcı profilini güncelleme
router.put('/profile', protect, updateUserProfile);

// Admin yetkisiyle kullanıcı silme
router.delete('/:id', protect, authorize(['admin']), deleteUser);

module.exports = router;
