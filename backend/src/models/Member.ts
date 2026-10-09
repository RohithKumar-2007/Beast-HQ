import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunityMember extends Document {
  name: string;
  email: string;
  favoriteContentType?: 'Challenges' | 'Philanthropy' | 'Gaming' | 'Survival' | 'Travel' | 'Other';
  reason?: string;
  createdAt: Date;
}

const CommunityMemberSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [255, 'Email cannot exceed 255 characters'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  favoriteContentType: {
    type: String,
    enum: ['Challenges', 'Philanthropy', 'Gaming', 'Survival', 'Travel', 'Other'],
    default: 'Other',
  },
  reason: {
    type: String,
    trim: true,
    maxlength: [500, 'Reason cannot exceed 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CommunityMember = mongoose.model<ICommunityMember>(
  'CommunityMember',
  CommunityMemberSchema
);
