import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import contentRoutes from './routes/content.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV === 'development';

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const staticPath = path.join(__dirname, '..', '..', 'static');
app.use('/static', express.static(staticPath, {
  maxAge: isDevelopment ? 0 : '1y',
  setHeaders: (res, filePath) => {
    // Add proper headers for audio files
    if (filePath.match(/\.(mp3|m4a|aac)$/)) {
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Type', filePath.endsWith('.mp3') ? 'audio/mpeg' : 'audio/aac');
    }
  },
}));

// API Routes
app.use('/api', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app in production
if (!isDevelopment) {
  const clientPath = path.join(__dirname, '..', 'client');
  app.use(express.static(clientPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Static files: ${staticPath}`);
});

export default app;
