import { Router, Request, Response } from 'express';
import { isDatabaseConnected } from '../db.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  const dbStatus = isDatabaseConnected() ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    service: 'BEAST HQ API',
    version: '1.0.0-phase6',
    phase: 6,
    database: dbStatus,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});
