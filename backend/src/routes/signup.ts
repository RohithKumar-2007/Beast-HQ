import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CommunityMember } from '../models/Member.js';
import { isDatabaseConnected } from '../db.js';

export const signupRouter = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

signupRouter.post('/community/signup', async (req: Request, res: Response) => {
  try {
    let { name, email, favoriteContentType, reason } = req.body;

    // 1. Sanitize & Normalize Inputs
    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    reason = typeof reason === 'string' ? reason.trim() : '';

    // 2. Validate Required Fields
    if (!name) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Name is required.',
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Email address is required.',
      });
      return;
    }

    // 3. Email Format Validation
    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    // 4. Max Length Validation
    if (name.length > 100) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Name cannot exceed 100 characters.',
      });
      return;
    }

    if (email.length > 255) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Email cannot exceed 255 characters.',
      });
      return;
    }

    if (reason.length > 500) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Reason cannot exceed 500 characters.',
      });
      return;
    }

    // Validate optional favoriteContentType enum
    const validTypes = ['Challenges', 'Philanthropy', 'Gaming', 'Survival', 'Travel', 'Other'];
    if (favoriteContentType && !validTypes.includes(favoriteContentType)) {
      favoriteContentType = 'Other';
    }

    // 5. Database Connection Check — Must be connected to save
    if (!isDatabaseConnected() || mongoose.connection.readyState !== 1) {
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Community registration database is currently offline or unreachable. Please try again later.',
      });
      return;
    }

    // 6. Write to MongoDB
    try {
      const newMember = await CommunityMember.create({
        name,
        email,
        favoriteContentType: favoriteContentType || 'Other',
        reason,
      });

      res.status(201).json({
        success: true,
        message: 'Community registration successful!',
        member: {
          name: newMember.name,
          email: newMember.email,
          favoriteContentType: newMember.favoriteContentType,
          createdAt: newMember.createdAt,
        },
      });
      return;
    } catch (err: unknown) {
      const mongoErr = err as { code?: number };
      // Catch E11000 Duplicate Key Error
      if (mongoErr.code === 11000) {
        res.status(409).json({
          error: 'Duplicate Email',
          message: 'An account with this email address has already been registered.',
        });
        return;
      }
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Failed to persist registration to database.',
      });
      return;
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error in POST /api/community/signup:', error.stack || error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your registration.',
    });
  }
});
