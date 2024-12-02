const jwt = require('jsonwebtoken');

//tokeni 1 gün olarak ayarlayan kod  
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { generateToken };
