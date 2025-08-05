# Render Deployment Guide - Prince Portfolio

## Render Full-Stack Deployment Steps

### 1. GitHub Repository Setup
1. Push your complete project to GitHub
2. Make sure all files are committed including:
   - `render.yaml` (deployment configuration)
   - `package.json` (dependencies and scripts)
   - All source code in `client/` and `server/` folders

### 2. Render Account Setup
1. Go to [render.com](https://render.com) and sign up/login
2. Connect your GitHub account
3. Select "New Web Service"
4. Choose your portfolio repository

### 3. Render Configuration
**Service Settings:**
- **Name:** prince-portfolio
- **Environment:** Node
- **Plan:** Free (sufficient for portfolio)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### 4. Environment Variables Setup
Add these environment variables in Render dashboard:

**Required for Gmail:**
- `GMAIL_USER` = your Gmail address (princekumar5252@gmail.com)
- `GMAIL_PASS` = your Gmail App Password (16-character password from Google)

**Required for MongoDB:**
- `MONGODB_URI` = your MongoDB Atlas connection string

**System Variables:**
- `NODE_ENV` = production
- `PORT` = 10000 (Render's default)

### 5. Gmail App Password Setup (Required for Production)
1. Go to Google Account Settings → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate new app password for "Mail"
5. Copy the 16-character password
6. Use this as `GMAIL_PASS` in Render

### 6. MongoDB Atlas Setup (for Production Database)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free cluster
3. Create database user with password
4. Whitelist Render's IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get connection string and add to `MONGODB_URI`

### 7. Deploy Process
1. Click "Create Web Service" in Render
2. Render will automatically detect `render.yaml`
3. Add all environment variables
4. Click "Deploy"
5. Wait for build and deployment to complete

### 8. Verification Steps
After deployment:
1. Visit your Render URL (provided after deployment)
2. Test contact form functionality
3. Verify email delivery to your Gmail
4. Check all portfolio sections load properly

## Production URLs
- **Live Site:** Your Render URL (will be provided after deployment)
- **Contact Form:** `yoursite.onrender.com/contact`
- **Admin Panel:** `yoursite.onrender.com/admin` (if needed)

## Email Configuration
- **SMTP Service:** Gmail SMTP
- **Delivery:** Direct to princekumar5252@gmail.com
- **Features:** HTML formatting, reply-to functionality
- **Backup:** MongoDB storage for all submissions

## Troubleshooting
**Common Issues:**
1. **Build fails:** Check that all dependencies are in package.json
2. **Email not working:** Verify Gmail App Password is correct
3. **Database errors:** Check MongoDB Atlas connection string
4. **Site not loading:** Verify build and start commands

**Support:**
- Render has excellent documentation and support
- MongoDB Atlas provides connection troubleshooting
- Gmail App Passwords are well documented by Google