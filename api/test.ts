import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.json({
    success: true,
    message: 'API is working properly!',
    timestamp: new Date().toISOString(),
    environment: {
      hasMongoDb: !!process.env.MONGODB_URI,
      hasGmail: !!process.env.GMAIL_USER && !!process.env.GMAIL_PASS,
      hasSendGrid: !!process.env.SENDGRID_API_KEY
    },
    endpoints: [
      '/api/contact - POST',
      '/api/resume/download - GET',
      '/api/test - GET'
    ]
  });
}