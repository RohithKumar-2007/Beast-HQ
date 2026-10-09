import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { signupRouter } from './routes/signup.js';
import { connectDatabase } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Connect to MongoDB
connectDatabase();

// Development CORS configuration
app.use(
  cors({
    origin: [FRONTEND_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// JSON request body parser with limit
app.use(express.json({ limit: '1mb' }));

// API Routes
app.use('/api', healthRouter);
app.use('/api', signupRouter);

// 404 Handler for undefined API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'API Endpoint Not Found',
    message: 'The requested API route does not exist on BEAST HQ backend.',
  });
});

// Root fallback notice
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'BEAST HQ Backend API — Phase 6',
    healthCheck: '/api/health',
    signupEndpoint: '/api/community/signup',
  });
});

// Global Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('BEAST HQ API Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred.',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ BEAST HQ Backend Server running on http://localhost:${PORT}`);
  console.log(`⚡ Health Check Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`⚡ Signup Endpoint: http://localhost:${PORT}/api/community/signup`);
});
