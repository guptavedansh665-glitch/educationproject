require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const curriculumRoutes = require('./routes/curriculum');
const profilesRoutes = require('./routes/profiles');
const quizzesRoutes = require('./routes/quizzes');
const syncRoutes = require('./routes/sync');
const notificationsRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Base Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    app: 'PindVidya Gateway API (ਪਿੰਡ ਵਿੱਦਿਆ)',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'pa',
    offlineSyncEnabled: process.env.ENABLE_OFFLINE_SYNC === 'true',
    timestamp: new Date().toISOString()
  });
});

// Mount Feature Routes
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/notifications', notificationsRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.method} ${req.originalUrl}' not found.`
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server if invoked directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌾 PindVidya API Server running at http://localhost:${PORT}/api/health`);
    console.log(`📡 Offline Sync Gateway active`);
  });
}

module.exports = app;
