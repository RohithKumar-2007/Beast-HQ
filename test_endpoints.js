import fs from 'fs';
import path from 'path';

async function runAudit() {
  console.log('====================================================');
  console.log('  BEAST HQ STRICT END-TO-END INTEGRATION AUDIT    ');
  console.log('====================================================\n');

  const API_BASE = 'http://localhost:5000/api';
  const FRONTEND_BASE = 'http://localhost:5173';

  let passedAssertions = 0;
  let failedAssertions = 0;
  let unavailableServices = 0;

  function assert(condition, message) {
    if (condition) {
      passedAssertions++;
      console.log(`   ✅ PASS: ${message}`);
    } else {
      failedAssertions++;
      console.error(`   ❌ FAIL: ${message}`);
    }
  }

  // ----------------------------------------------------
  // 1. Backend Service & Health Check Audit
  // ----------------------------------------------------
  console.log('1. Backend Service & Health Check (GET /api/health):');
  let isBackendOnline = false;
  let isDbConnected = false;

  try {
    const res = await fetch(`${API_BASE}/health`);
    assert(res.status === 200, `Health check returned HTTP ${res.status} (expected 200)`);
    
    const data = await res.json();
    assert(data.status === 'ok', `Health status is "${data.status}" (expected "ok")`);
    assert(typeof data.database === 'string', 'Database status field exists in health response');

    isBackendOnline = true;
    isDbConnected = data.database === 'connected';
    console.log(`   ℹ️ Database Connection State: ${data.database}`);
  } catch (err) {
    unavailableServices++;
    console.warn(`   ⚠️ SERVICE UNAVAILABLE: Backend API is not responding on ${API_BASE}/health (${err.message})`);
  }

  // ----------------------------------------------------
  // 2. Frontend SPA Routes Availability Audit
  // ----------------------------------------------------
  console.log('\n2. Frontend SPA Routes Audit (http://localhost:5173):');
  const routes = ['/', '/content', '/journey', '/community'];
  let isFrontendOnline = false;

  for (const route of routes) {
    try {
      const res = await fetch(`${FRONTEND_BASE}${route}`);
      const text = await res.text();
      const isOk = res.status === 200 && text.includes('id="root"');
      assert(isOk, `Route ${route} rendered index shell with HTTP 200`);
      isFrontendOnline = true;
    } catch (err) {
      if (!isFrontendOnline && route === '/') {
        unavailableServices++;
        console.warn(`   ⚠️ SERVICE UNAVAILABLE: Frontend dev server is not responding on ${FRONTEND_BASE} (${err.message})`);
      } else {
        assert(false, `Route ${route} failed to respond: ${err.message}`);
      }
    }
  }

  // ----------------------------------------------------
  // 3. API Registration & Database Persistence Audit
  // ----------------------------------------------------
  console.log('\n3. Registration API & Database Persistence Audit:');

  if (!isBackendOnline) {
    console.warn('   ⚠️ Skipped live API tests because Backend server is offline.');
  } else {
    const testEmail = `audit_${Date.now()}@example.com`;
    let registrationSucceeded = false;

    // Test A: Normal Registration Request
    try {
      const res = await fetch(`${API_BASE}/community/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Audit Test User',
          email: testEmail,
          favoriteContentType: 'Challenges',
          reason: 'Automated integration audit.',
        }),
      });

      const data = await res.json();

      if (isDbConnected) {
        assert(res.status === 201 && data.success === true, `Valid signup with DB connected returned HTTP 201 Created`);
        registrationSucceeded = res.status === 201;
      } else {
        assert(
          res.status === 503 && data.success !== true,
          `Signup with DB disconnected correctly returned HTTP 503 Service Unavailable (received ${res.status})`
        );
      }
    } catch (err) {
      assert(false, `POST /api/community/signup failed with network error: ${err.message}`);
    }

    // Test B: Duplicate Email Prevention
    if (isDbConnected && registrationSucceeded) {
      try {
        const res = await fetch(`${API_BASE}/community/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Duplicate User',
            email: testEmail,
          }),
        });
        const data = await res.json();
        assert(res.status === 409 && data.error === 'Duplicate Email', `Duplicate signup returned HTTP 409 Conflict`);
      } catch (err) {
        assert(false, `Duplicate email test failed: ${err.message}`);
      }
    }

    // Test C: Invalid Input Validation
    try {
      const res = await fetch(`${API_BASE}/community/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email: 'not-an-email',
        }),
      });
      assert(res.status === 400, `Invalid input returned HTTP 400 Bad Request (received ${res.status})`);
    } catch (err) {
      assert(false, `Invalid input test failed: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // 4. Data & Content Source Files Integrity Audit
  // ----------------------------------------------------
  console.log('\n4. Data & Content Source Files Integrity Audit:');

  try {
    const videosFilePath = path.join(process.cwd(), 'frontend', 'src', 'data', 'videos.ts');
    const videosContent = fs.readFileSync(videosFilePath, 'utf8');
    
    assert(videosContent.includes('FEATURED_VIDEOS'), 'videos.ts exports FEATURED_VIDEOS');
    assert(videosContent.includes('https://www.youtube.com/watch?v='), 'videos.ts contains canonical YouTube watch URLs');
    assert(videosContent.includes('verifiedSource'), 'videos.ts contains verifiedSource citations');

    const journeyFilePath = path.join(process.cwd(), 'frontend', 'src', 'data', 'journey.ts');
    const journeyContent = fs.readFileSync(journeyFilePath, 'utf8');
    assert(journeyContent.includes('JOURNEY_MILESTONES'), 'journey.ts exports JOURNEY_MILESTONES');
    assert(journeyContent.includes('sourceUrl'), 'journey.ts contains primary source URLs');

    const quizFilePath = path.join(process.cwd(), 'frontend', 'src', 'data', 'quiz.ts');
    const quizContent = fs.readFileSync(quizFilePath, 'utf8');
    assert(quizContent.includes('QUIZ_QUESTIONS'), 'quiz.ts exports QUIZ_QUESTIONS');
    assert(quizContent.includes('calculateQuizResult'), 'quiz.ts exports deterministic scoring function');
  } catch (err) {
    assert(false, `Source content files check failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // Final Verdict & Exit Code Handling
  // ----------------------------------------------------
  console.log('\n====================================================');
  console.log('  AUDIT SUMMARY RESULTS                             ');
  console.log('====================================================');
  console.log(`   Assertions Passed:       ${passedAssertions}`);
  console.log(`   Assertions Failed:       ${failedAssertions}`);
  console.log(`   Unavailable Services:    ${unavailableServices}`);

  if (failedAssertions > 0) {
    console.error('\n❌ OVERALL RESULT: FAILED (Assertions failed during test execution)');
    process.exit(1);
  } else if (unavailableServices > 0) {
    console.warn('\n⚠️ OVERALL RESULT: INCOMPLETE (Required services are offline; cannot perform 100% live verification)');
    process.exit(1);
  } else {
    console.log('\n✅ OVERALL RESULT: PASSED (All assertions and services verified)');
    process.exit(0);
  }
}

runAudit();
