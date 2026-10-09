import { execSync } from 'child_process';
import path from 'path';

try {
  const backendDir = path.join(process.cwd(), 'backend');
  execSync('npx tsx src/verify_mongo.ts', { cwd: backendDir, stdio: 'inherit' });
} catch (err) {
  const status = typeof err === 'object' && err !== null && 'status' in err ? Number(err.status) : 1;
  process.exit(status || 1);
}
