import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from './utils/logger';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Allow all requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['*'],
  credentials: false
}));

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      ai: 'operational',
      image_generation: 'operational',
      video_generation: 'operational',
      code_assistant: 'operational',
      text_to_speech: 'operational'
    }
  });
});

// API routes
app.use('/api/v1', require('./routes'));

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔌 API: http://localhost:${PORT}/api/v1`);
  logger.info(`🎨 Image Gen: http://localhost:${PORT}/api/v1/generate/image`);
  logger.info(`🎬 Video Gen: http://localhost:${PORT}/api/v1/generate/video`);
  logger.info(`💬 Chat: http://localhost:${PORT}/api/v1/chat`);
  logger.info(`🔧 Code: http://localhost:${PORT}/api/v1/code`);
  logger.info(`🎤 Voice: http://localhost:${PORT}/api/v1/voice`);
});

export default app;
