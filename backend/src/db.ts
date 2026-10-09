import mongoose from 'mongoose';

let isConnected = false;

export async function connectDatabase(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️ MONGODB_URI environment variable not configured.');
    return false;
  }

  try {
    // 5 second connection timeout for fast startup failure fallback
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions);
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
    return true;
  } catch (err: unknown) {
    const error = err as Error;
    isConnected = false;
    console.warn('⚠️ MongoDB connection attempt failed:', error.message);
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
