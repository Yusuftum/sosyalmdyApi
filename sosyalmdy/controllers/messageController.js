const Message = require('../models/Message');
const User = require('../models/User');

// Mesaj gönderme
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const message = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcıya gelen mesajları listeleme
exports.getReceivedMessages = async (req, res) => {
    try {
        const messages = await Message.find({ receiver: req.user.id }).populate('sender', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcı tarafından gönderilen mesajları listeleme
exports.getSentMessages = async (req, res) => {
    try {
        const messages = await Message.find({ sender: req.user.id }).populate('receiver', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
