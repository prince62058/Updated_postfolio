# Railway Deployment Guide

Railway पर आपकी portfolio website को deploy करने के लिए यह step-by-step guide है।

## Prerequisites

✅ GitHub account
✅ Railway account (https://railway.app)
✅ MongoDB Atlas account (database के लिए)
✅ Gmail या SendGrid account (email के लिए)

## Step 1: Repository Setup

1. अपनी project को GitHub पर push करें:
```bash
git add .
git commit -m "Railway deployment ready"
git push origin main
```

## Step 2: Railway Project बनाएं

1. Railway.app पर login करें
2. "New Project" पर click करें
3. "Deploy from GitHub repo" select करें
4. अपनी portfolio repository choose करें
5. Railway automatically detect करेगा कि यह Node.js project है

## Step 3: Environment Variables Setup

Railway dashboard में अपनी service के Variables section में जाकर ये environment variables add करें:

### Database Configuration
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Email Configuration (Choose One)

**Option 1: Gmail SMTP**
```
GMAIL_USER = your-email@gmail.com
GMAIL_PASS = your-app-specific-password
```

**Option 2: SendGrid**
```
SENDGRID_API_KEY = your-sendgrid-api-key
```

**Important**: 
- `PORT` variable add नहीं करना - Railway automatically provide करता है
- `NODE_ENV` automatically production में set हो जाता है

## Step 4: Database Setup (MongoDB Atlas)

1. MongoDB Atlas पर project create करें
2. Database user create करें
3. Network access में अपना IP whitelist करें या 0.0.0.0/0 (all access)
4. Connection string copy करें और MONGODB_URI में paste करें

## Step 5: Email Setup

### Gmail SMTP के लिए:
1. Gmail account में 2-factor authentication enable करें
2. App Password generate करें (https://myaccount.google.com/apppasswords)
3. Generated password को GMAIL_PASS में use करें

### SendGrid के लिए:
1. SendGrid account create करें
2. API key generate करें
3. API key को SENDGRID_API_KEY में use करें

## Step 6: Deploy करें

1. Railway automatically आपकी project को build और deploy करेगा
2. Build process monitor करें logs section में
3. Success होने पर आपको deployment URL मिलेगा

## Step 7: Custom Domain (Optional)

1. Railway dashboard में Settings → Networking जाएं
2. "Custom Domain" add करें
3. आपके domain registrar में CNAME record add करें

## Build Commands

Railway automatically ये commands use करेगा (आपको manually set करने की जरूरत नहीं):

```bash
# Build command
npm run build

# Start command  
npm start
```

## Troubleshooting

### Common Issues:

1. **Build Failed**: 
   - Dependencies check करें package.json में
   - Node version compatibility verify करें

2. **Environment Variables Missing**:
   - Railway dashboard में Variables section check करें
   - Spelling और values verify करें

3. **Database Connection Failed**:
   - MongoDB URI check करें
   - IP whitelist verify करें MongoDB Atlas में

4. **Email Not Working**:
   - Gmail app password correct है verify करें
   - SendGrid API key valid है check करें

## प्रयोजन के बाद

✅ Website live होने के बाद contact form test करें
✅ Resume download functionality check करें  
✅ All animations properly load हो रहे हैं verify करें
✅ Mobile responsiveness test करें

## Support

अगर कोई issue आए तो Railway के logs section में detailed error messages मिलेंगे।

Railway deployment सफल होने के बाद आपकी portfolio website live हो जाएगी! 🚀