const User = require('../models/User');
const { generateToken } = require('../utils/auth');

//kullanıcı kaydı 
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ token: generateToken(user) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//kullanıcı girişi
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//admin kullanıcı kaydı
exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password, role: 'admin' });
        await user.save();
        res.status(201).json({ 
            token: generateToken(user),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
