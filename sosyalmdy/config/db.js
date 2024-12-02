const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Veritabanına bağlantı sağlandı'))
    .catch((err) => console.error('Veritabanı bağlantı hatası:', err));
};

module.exports = connectDB;
