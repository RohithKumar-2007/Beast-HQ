import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { CommunityMember } from './models/Member.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function verifyMongo() {
  console.log('==================================================');
  console.log('  MONGODB CONNECTION & RECORD PERSISTENCE VERIFY  ');
  console.log('==================================================\n');

  const uri = process.env.MONGODB_URI;
  console.log('1. Environment Configuration Inspection:');
  console.log('   MONGODB_URI Variable Configured:', !!uri);
  if (uri) {
    console.log('   Target Host String:', uri.replace(/\/\/[^@]+@/, '//***:***@'));
  }

  if (!uri) {
    console.error('❌ FAIL: MONGODB_URI environment variable is not configured.');
    process.exit(1);
  }

  console.log('\n2. Testing Database Connection & Operations...');
  try {
    // 3 second connection timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error(`MongoDB connection readyState is ${mongoose.connection.readyState} (expected 1).`);
    }

    console.log('✅ MongoDB Status: CONNECTED (readyState = 1)');

    // Admin ping
    if (mongoose.connection.db) {
      const pingRes = await mongoose.connection.db.admin().ping();
      console.log('✅ Admin Ping Succeeded:', JSON.stringify(pingRes));

      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('✅ Identified Collections Count:', collections.length);
    }

    // Direct Mongoose Model Document Count
    const memberCount = await CommunityMember.countDocuments();
    console.log('✅ Mongoose CommunityMember Collection Document Count:', memberCount);

    // Sanity check: fetch document count without logging sensitive member details
    const recentMembers = await CommunityMember.find().sort({ createdAt: -1 }).limit(5);
    console.log(`✅ Retrieved ${recentMembers.length} recent records (sensitive fields redacted for privacy).`);

    await mongoose.disconnect();
    console.log('\n==================================================');
    console.log('  RESULT: REAL MONGODB PERSISTENCE VERIFIED ✅');
    console.log('==================================================');
    process.exit(0);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('\n❌ DATABASE CONNECTION FAILED / UNREACHABLE');
    console.error('   Error Details:', error.message);
    console.error('   Reason: Database server is offline or unreachable.');
    console.log('\n==================================================');
    console.log('  RESULT: MONGODB PERSISTENCE VERIFICATION FAILED ❌');
    console.log('==================================================');
    process.exit(1);
  }
}

verifyMongo();
