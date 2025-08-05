// Serverless function for Render static sites
// This will handle contact form submissions even in static deployment

const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// CORS headers for static sites
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// Create Gmail transporter
function createEmailTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Gmail credentials not available');
    return null;
  }

  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
}

// MongoDB connection
let cachedClient = null;
async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    console.warn('MongoDB URI not available');
    return null;
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

// Main handler function
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(headers).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).set(headers).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).set(headers).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const timestamp = new Date();
    const submissionData = { name, email, subject, message, submittedAt: timestamp };

    // Try to store in MongoDB
    let submissionId = null;
    try {
      const client = await connectToDatabase();
      if (client) {
        const db = client.db('portfolio_db');
        const collection = db.collection('contact_submissions');
        const result = await collection.insertOne(submissionData);
        submissionId = result.insertedId;
        console.log('Stored in MongoDB:', submissionId);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    // Try to send email
    let emailSent = false;
    try {
      const transporter = createEmailTransporter();
      if (transporter) {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: 'princekumar5252@gmail.com',
          subject: `Portfolio Contact: ${subject}`,
          replyTo: email,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px;">
              <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
                <h2 style="margin: 0; color: white;">💼 New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0ea5e9;">
                <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
                <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>📝 Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; margin-top: 10px;">
                <h3 style="color: #1e293b; margin-top: 0;">💬 Message</h3>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6; color: #334155;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="background: #f8fafc; padding: 15px; margin-top: 10px; border-radius: 0 0 8px 8px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #64748b;">
                  📅 Received: ${timestamp.toLocaleString()} | 
                  🌐 Portfolio Contact Form | 
                  💌 Reply to: ${email}
                </p>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission from Portfolio Website

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received: ${timestamp.toLocaleString()}
Reply to: ${email}
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log('Email sent successfully');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    // Return response
    const response = {
      success: true,
      message: emailSent 
        ? 'Message sent and stored successfully!' 
        : 'Message stored successfully! Email notification may have failed.',
      submissionId,
      emailSent
    };

    return res.status(200).set(headers).json(response);

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).set(headers).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};