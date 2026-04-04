import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE SETUP (Enterprise Standards)
// ============================================

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ReCycleX Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ============================================
// ROUTES (Placeholder for Phase 2)
// ============================================
// Routes will be added in Phase 2

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE (MUST BE LAST)
// ============================================
app.use(errorHandler);

// ============================================
// SERVER INITIALIZATION
// ============================================
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🌱 ReCycleX Backend Started          ║
║   Environment: ${process.env.NODE_ENV || 'development'.padEnd(14)}║
║   Port: ${PORT.toString().padEnd(26)}║
║   MongoDB: Connected ✅                ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏸️  Shutting down gracefully...');
  process.exit(0);
});

startServer();

export default app;
