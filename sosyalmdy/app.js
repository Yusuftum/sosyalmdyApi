const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./utils/errorHandler');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

// Environment Variables Kontrolü
if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.PORT) {
  throw new Error('Environment variables are missing. Please check your .env file.');
}

// Veritabanı Bağlantısını Kur
connectDB();

// Güvenlik Middleware'leri
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // Her 15 dakikada bir IP adresinden en fazla 100 istek
});
app.use(limiter);

// Logging Middleware
app.use(morgan('dev'));

// Body Parsing Middleware
app.use(express.json());

// Swagger Dokümantasyonu
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Social Media API',
      version: '1.0.0',
      description: 'API for Social Media Application'
    },
  },
  apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Rotaları
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

// Hata Yönetimi Middleware'i
app.use(errorHandler);

// Sunucuyu Dinleme
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Portunda çalışıyor ${PORT}`);
});
