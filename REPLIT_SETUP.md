# Replit Setup Guide

## ✅ Setup Complete!

Your portfolio has been successfully imported and configured to run in the Replit environment.

## 🚀 Current Status

- **Server**: Running on port 5000
- **Frontend**: React + Vite with hot reload
- **Backend**: Express.js API server
- **Storage**: MongoDB (with in-memory fallback)
- **Deployment**: Configured for Autoscale

## 📋 Environment Variables (Optional)

To enable all features, you can add these environment variables in Replit Secrets:

### MongoDB (Optional)
```
MONGODB_URI=your_mongodb_connection_string
```
**Note**: The app works with in-memory storage by default. MongoDB is optional.

### Email Notifications (Optional)
```
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password
```
Or use SendGrid:
```
SENDGRID_API_KEY=your_sendgrid_api_key
```

### N8n Chat Integration (Optional)
```
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

## 🎯 Features Working

✅ Modern portfolio UI with GSAP animations
✅ Smooth scrolling with Locomotive Scroll
✅ Contact form with data storage
✅ Resume download functionality
✅ Responsive design
✅ 3D Spline integration (WebGL in hero section)
✅ AI chatbot interface (n8n)

## 🛠️ Development

The app is already running! You can:
- View your portfolio in the Webview
- Edit files - changes will hot reload automatically
- Check the console for logs

## 📦 Deployment

To publish your app:
1. Click the "Deploy" button in Replit
2. Your app is configured for Autoscale deployment
3. Build command: `npm run build`
4. Start command: `npm start`

## 🔧 Troubleshooting

### If the app doesn't load:
1. Check the console for errors
2. Make sure port 5000 is not blocked
3. Try restarting the workflow

### If you need MongoDB:
1. Create a MongoDB Atlas account (free tier available)
2. Get your connection string
3. Add it to Replit Secrets as `MONGODB_URI`
4. Restart the app

### If email doesn't work:
The app will still save contact submissions even without email configured. To enable emails:
1. Set up Gmail App Password or SendGrid API key
2. Add credentials to Replit Secrets
3. Restart the app

## 📚 Project Structure

```
portfolio/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # App pages
│   │   └── lib/         # Utilities
├── server/          # Express backend
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Data storage
│   └── index.ts     # Server entry
├── shared/          # Shared types
└── package.json     # Dependencies
```

## 🎨 Customization

Edit these files to customize:
- `/client/src/data/*` - Portfolio content
- `/client/src/pages/*` - Page layouts
- `/client/index.css` - Colors and theme
- `/server/routes.ts` - API endpoints

## 📞 Support

For issues specific to:
- **Replit Environment**: Check Replit documentation
- **Portfolio Features**: Review README.md
- **MongoDB Setup**: Visit MongoDB Atlas docs
