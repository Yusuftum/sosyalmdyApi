const mongoose = require('mongoose');

// gönderi şeması
const postSchema = new mongoose.Schema({
    content: { type: String, required: true }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Mesajın sahibi
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Mesajı beğenen kullanıcılar
    comments: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
