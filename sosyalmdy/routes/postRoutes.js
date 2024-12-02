const express = require('express');
const { createPost, getPosts, likePost, commentOnPost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

//post oluşturma 
router.post('/', protect, createPost); 
//postları getirme
router.get('/', getPosts); 
//beğeme 
router.post('/like', protect, likePost);
//beğenileri listleleme 
router.post('/comment', protect, commentOnPost);

module.exports = router;