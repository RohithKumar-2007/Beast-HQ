# BEAST HQ — Unofficial Fan Showcase & Community Platform

> **Disclaimer:** BEAST HQ is an unofficial fan project and community website dedicated to MrBeast (Jimmy Donaldson). It is not affiliated with, sponsored by, or endorsed by MrBeast or any of his official entities.

---

## ⚡ Project Overview

BEAST HQ is a modern, responsive, accessible fan showcase and community platform built in modular phases:
- **Phase 1:** Modular React + Vite + TypeScript frontend and Node.js + Express backend foundation.
- **Phase 2:** Complete Home page (`/`) featuring creator profile, featured content, and backend system health indicator.
- **Phase 3:** Complete Content Explorer (`/content`) featuring a curated catalog of 10 real MrBeast videos, real-time title search, and category filter pills (`All`, `Challenge`, `Survival`, `Philanthropy`, `Travel`).
- **Phase 4:** Complete Journey page (`/journey`) featuring a 2012–2024 chronological milestone timeline and verified impact highlights (Team Trees, Team Seas, water wells).
- **Phase 5:** Complete Community page (`/community`) featuring the interactive **“What Kind of Beast Fan Are You?”** persona quiz with deterministic scoring.
- **Phase 6:** Community Registration Form connected to Express backend API (`POST /api/community/signup`) and MongoDB persistence via Mongoose with email validation, E11000 duplicate email detection, and HTTP 503 offline service handling.

---

## 🚀 Installation & Clean Setup Instructions

> **Important Packaging & Setup Notice:**
> - Dependencies MUST be installed cleanly on the target operating system (Windows, macOS, or Linux).
> - Source ZIP deliverables and repositories MUST NOT distribute `node_modules/`, generated `dist/` build output folders, log files, or `.env` credential files.
> - Always copy `.env.example` templates to create local `.env` files on the target environment.

### 1. Install Dependencies Cleanly
From the root workspace directory, run:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Return to root workspace
cd ..
```

### 2. Environment Configuration

#### Backend Environment Setup (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# Local Development Frontend Origin:
FRONTEND_ORIGIN=http://localhost:5173

# Production Frontend Origin (e.g. deployed Vercel frontend URL):
# FRONTEND_ORIGIN=https://<your-vercel-app>.vercel.app

# MongoDB Connection String (Local daemon or MongoDB Atlas cloud connection):
MONGODB_URI=mongodb://127.0.0.1:27017/beast-hq
# Production Example: MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/beast-hq?retryWrites=true&w=majority
```

#### Frontend Production Environment Setup (`frontend/.env`)
For production builds where the API server is hosted on a separate host (e.g., Render):

```env
# Production API Base URL (Render API base URL ending in /api):
VITE_API_BASE_URL=https://<your-render-app>.onrender.com/api
```
*(In local development, leave `VITE_API_BASE_URL` blank to rely on Vite's local dev proxy at `/api`)*

---

## 💻 Running Development & Verification Tools

### Start Local Development Servers
Run both frontend and backend concurrently from the root workspace:

```bash
npm run dev
```

Or launch services individually:
- **Frontend App** (http://localhost:5173): `npm run dev:frontend`
- **Backend API Server** (http://localhost:5000): `npm run dev:backend`

### Type Check & Production Build Verification
```bash
# Run TypeScript type checks for frontend and backend
npm run type-check

# Compile production build artifacts into frontend/dist and backend/dist
npm run build
```

### End-to-End Test Suite Execution
```bash
# Run backend database verifier (exits code 1 on connection failure)
node verify_mongo_connection.js

# Run integration audit test suite (exits code 1 on failed assertion or offline required service)
node test_endpoints.js
```

---

## 🏗️ Project Architecture

```
beast-hq/
├── frontend/
│   ├── src/
│   │   ├── config/          # api.ts (Configurable VITE_API_BASE_URL)
│   │   ├── data/            # videos.ts, journey.ts, quiz.ts, creatorInfo.ts
│   │   ├── components/      # Navbar, Footer, Button, SectionHeading, VideoCard, FanQuiz, SignupForm, Icons
│   │   ├── pages/           # HomePage, ContentPage, JourneyPage, CommunityPage, NotFoundPage
│   │   ├── styles/          # Design tokens (variables.css), reset (base.css), components.css
│   │   ├── App.tsx          # BrowserRouter SPA container
│   │   └── main.tsx         # React entry point
│   ├── index.html
│   ├── vercel.json          # SPA route rewrite excluding /api/*
│   ├── tsconfig.json
│   ├── .env.example
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── db.ts            # Mongoose connection manager
│   │   ├── models/          # Member.ts schema with E11000 unique email index
│   │   ├── routes/          # health.ts (GET /api/health) and signup.ts (POST /api/community/signup)
│   │   ├── verify_mongo.ts  # Direct database connection & document count verifier
│   │   └── server.ts        # Express entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── verify_mongo_connection.js # Root helper delegating to backend verify_mongo.ts
├── test_endpoints.js          # Integration test suite with assertions and exit code handling
├── package.json
└── README.md
```

---

## 🔒 Security & Privacy Policy
- **No Credentials in Source:** `.env` files are excluded from git via `.gitignore`.
- **Privacy First:** No passwords or credit card information collected.
- **Input Sanitization:** Express backend validates email formats, trims strings, enforces max length limits, and prevents duplicate email registrations via Mongoose index constraints.
