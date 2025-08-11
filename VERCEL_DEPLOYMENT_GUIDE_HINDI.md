# Vercel Deployment Guide - Portfolio Website (हिंदी में)

## आवश्यकताएं
1. GitHub account
2. Vercel account (मुफ्त)
3. MongoDB Atlas account database के लिए
4. Gmail account email functionality के लिए

## Step 1: Repository तैयार करें
1. अपना code GitHub repository में push करें
2. सुनिश्चित करें कि सभी files commit हैं:
   - `vercel.json` (configuration file)
   - `package.json` (dependencies)
   - Environment variables setup

## Step 2: Environment Variables
Vercel dashboard में ये environment variables set करें:

### Database Configuration
- `MONGODB_URI` = आपका MongoDB Atlas connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

### Email Configuration (कोई एक चुनें)
**Option 1: Gmail SMTP**
- `GMAIL_USER` = आपका Gmail address
- `GMAIL_PASS` = App password (regular password नहीं)

**Option 2: SendGrid**
- `SENDGRID_API_KEY` = आपका SendGrid API key

## Step 3: Vercel पर Deploy करें

### Method 1: Vercel Website (Recommended)
1. https://vercel.com पर जाएं
2. GitHub के साथ login करें
3. "New Project" पर click करें
4. अपना GitHub repository import करें
5. Framework Preset: "Vite" select करें (या "Other")
6. Build Command: `node build.js` (automatic detect होगा)
7. Output Directory: `dist`
8. Install Command: `npm install`
9. Settings में environment variables configure करें
10. Deploy करें

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Domain Configuration
- आपका app यहां available होगा: `https://your-project-name.vercel.app`
- Vercel dashboard में custom domain add कर सकते हैं

## Step 5: Database Setup
1. MongoDB Atlas cluster बनाएं
2. Vercel IPs को whitelist करें या सभी IPs के लिए 0.0.0.0/0 use करें
3. Connection string लें और environment variables में add करें

## Step 6: Email Setup

### Gmail Setup
1. 2-factor authentication enable करें
2. App Password generate करें:
   - Google Account → Security → App passwords
   - Select app: Mail
   - 16-character password copy करें

### SendGrid Setup
1. SendGrid account बनाएं
2. Settings → API Keys पर जाएं
3. Full access के साथ नया API key बनाएं
4. API key को environment variables में copy करें

## समस्या निवारण

### Build Errors
- Vercel dashboard में build logs check करें
- सुनिश्चित करें कि सभी dependencies package.json में हैं
- TypeScript compilation verify करें

### Database Connection
- MongoDB Atlas whitelist check करें
- Connection string format verify करें
- Function logs में connection test करें

### Email Issues
- Gmail app password verify करें
- SendGrid API key permissions check करें
- Email sending logs review करें

## Vercel के लिए File Structure
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

## महत्वपूर्ण बातें
- Vercel automatically Node.js projects detect करता है
- Static files root या dist directory से serve होती हैं
- API routes serverless functions द्वारा handle होते हैं
- Environment variables case-sensitive हैं
- Free tier में प्रति महीने 100GB bandwidth शामिल है

## Deployment के बाद Checklist
- [ ] Website सही तरीके से load हो रही है
- [ ] Contact form successfully submit हो रहा है
- [ ] Email notifications काम कर रही हैं
- [ ] Database submissions save कर रहा है
- [ ] Resume download काम कर रहा है
- [ ] सभी animations properly load हो रही हैं
- [ ] Mobile responsiveness काम कर रही है

## सहायता
यदि आपको समस्याएं आती हैं:
1. Vercel function logs check करें
2. Environment variables verify करें
3. API endpoints को directly test करें
4. MongoDB Atlas network access check करें

## Quick Deployment Steps (त्वरित steps)
1. GitHub पर code push करें
2. Vercel.com पर जाकर repository import करें
3. Environment variables add करें
4. Deploy button दबाएं
5. Live website का link मिल जाएगा