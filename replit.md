# Prince Kumar Portfolio

## Project Overview
Full-stack portfolio website built with React, Express, and MongoDB.

## Recent Updates (November 10, 2025)
- ✅ Project successfully migrated to Replit environment
- ✅ MongoDB connected and configured
- ✅ Resume uploaded to MongoDB (Prince-Kumar-MERN-Resume.pdf - 300.78 KB)
- ✅ Resume download API working: `/api/resume/download`

## Email Configuration Status
- **Status:** Using Gmail SMTP (Nodemailer)
- **Integration:** Gmail App Password (user preferred over SendGrid)
- **Required Secrets:**
  - `GMAIL_USER` - Gmail address (default: princekumar5252@gmail.com)
  - `GMAIL_APP_PASSWORD` - Gmail App Password (NOT regular password!)
- **Note:** SendGrid removed per user request - using only Nodemailer now

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Framer Motion, GSAP
- **Backend:** Node.js, Express, MongoDB
- **Email:** SendGrid (primary), Nodemailer/Gmail (fallback)
- **Deployment:** Configured for autoscale deployment

## API Endpoints
- `POST /api/contact` - Contact form submission
- `GET /api/resume/download` - Download resume from MongoDB
- `GET /api/health` - Health check

## MongoDB Collections
- `users` - User accounts
- `contact_submissions` - Contact form entries
- `resumes` - Resume files (binary data)

## User Preferences
- Language: Hindi/English mix preferred for communication
- Direct and practical approach
