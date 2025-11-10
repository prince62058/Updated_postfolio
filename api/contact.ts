import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    console.log('📧 Sending email via Gmail SMTP...');

    // Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      pool: true,
      maxConnections: 3
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError: any) {
      console.error('❌ SMTP verification failed:', verifyError.message);
      return res.status(500).json({
        success: false,
        message: 'Email server connection failed. Please check Gmail App Password.'
      });
    }

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER || 'princekumar5252@gmail.com',
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
              📅 Received: ${new Date().toLocaleString()} | 
              🌐 Portfolio Contact Form | 
              💌 Reply to: ${email}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail!');
    console.log('Message ID:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again or contact directly.',
      error: error.message
    });
  }
}