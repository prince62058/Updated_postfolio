# Vercel Deployment Guide - Portfolio Website

## Prerequisites
1. GitHub account
2. Vercel account (free)
3. MongoDB Atlas account for database
4. Gmail account for email functionality

## Step 1: Prepare Repository
1. Push your code to GitHub repository
2. Make sure all files are committed including:
   - `vercel.json` (configuration file)
   - `package.json` (dependencies)
   - Environment variables setup

## Step 2: Environment Variables
Set these environment variables in Vercel dashboard:

### Database Configuration
- `MONGODB_URI` = Your MongoDB Atlas connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

### Email Configuration (Choose one)
**Option 1: Gmail SMTP**
- `GMAIL_USER` = Your Gmail address
- `GMAIL_PASS` = App password (not regular password)

**Option 2: SendGrid**
- `SENDGRID_API_KEY` = Your SendGrid API key

## Step 3: Deploy to Vercel

### Method 1: Vercel Website (Recommended)
1. Go to https://vercel.com
2. Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Framework Preset: Select "Vite" (or "Other")
6. Build Command: `node build.js` (will auto-detect)
7. Output Directory: `dist`
8. Install Command: `npm install`
9. Configure environment variables in Settings
10. Deploy

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Domain Configuration
- Your app will be available at: `https://your-project-name.vercel.app`
- You can add custom domain in Vercel dashboard

## Step 5: Database Setup
1. Create MongoDB Atlas cluster
2. Whitelist Vercel IPs or use 0.0.0.0/0 for all IPs
3. Get connection string and add to environment variables

## Step 6: Email Setup

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password:
   - Google Account → Security → App passwords
   - Select app: Mail
   - Copy the 16-character password

### SendGrid Setup
1. Create SendGrid account
2. Go to Settings → API Keys
3. Create new API key with full access
4. Copy API key to environment variables

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

### Database Connection
- Check MongoDB Atlas whitelist
- Verify connection string format
- Test connection in function logs

### Email Issues
- Verify Gmail app password
- Check SendGrid API key permissions
- Review email sending logs

## File Structure for Vercel
```
project/
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies
├── server/              # Backend API
│   └── index.ts        # Main server file
├── client/             # Frontend
│   ├── src/
│   └── index.html
└── dist/               # Build output
```

## Important Notes
- Vercel automatically detects Node.js projects
- Static files are served from the root or dist directory
- API routes are handled by serverless functions
- Environment variables are case-sensitive
- Free tier includes 100GB bandwidth per month

## Post-Deployment Checklist
- [ ] Website loads correctly
- [ ] Contact form submits successfully
- [ ] Email notifications work
- [ ] Database saves submissions
- [ ] Resume download works
- [ ] All animations load properly
- [ ] Mobile responsiveness works

## Support
If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas network access