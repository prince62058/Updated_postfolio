# Prince Kumar Portfolio

## Project Overview
Full-stack portfolio website built with React, Express, and MongoDB.

## Recent Updates (November 10, 2025)
- ✅ Project successfully migrated to Replit environment
- ✅ MongoDB connected and configured
- ✅ Resume uploaded to MongoDB (Prince-Kumar-MERN-Resume.pdf - 300.78 KB)
- ✅ Resume download API working: `/api/resume/download`

## Email Configuration Status
- **Status:** Pending setup
- **Integration:** SendGrid (manually configured - user declined connector integration)
- **Required Secrets:**
  - `SENDGRID_API_KEY` - Get from SendGrid dashboard
  - `SENDGRID_FROM_EMAIL` - Verified sender email
- **Note:** User needs to add these secrets manually in Replit Secrets panel
- **Fallback:** Gmail SMTP configured but requires `GMAIL_USER` and `GMAIL_APP_PASSWORD`

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
