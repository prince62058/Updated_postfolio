import { MailService } from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// Initialize mail service only when needed and if API key is available
let mailService: MailService | null = null;

function getMailService(): MailService | null {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not set - email functionality will be disabled');
    return null;
  }
  
  if (!mailService) {
    mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }
  
  return mailService;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const service = getMailService();
    if (!service) {
      console.warn('Email service not available - contact form submission logged only');
      return false;
    }

    const emailContent = {
      to: 'princekumar5252@gmail.com', // Your email
      from: 'noreply@prince-portfolio.com', // Verified sender (you'll need to verify this domain)
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${formData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #64748b;">
            <p>This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

This message was sent from your portfolio website contact form.
      `
    };

    await service.send(emailContent);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Nodemailer configuration for Gmail
function createNodemailerTransporter() {
  // Check if Gmail credentials are available
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_PASS;
  
  if (!gmailUser || !gmailPassword) {
    console.warn('Gmail credentials not set - trying alternative email methods');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: gmailUser,
      pass: gmailPassword // This should be an App Password, not your regular password
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000
  });
}

// Nodemailer email function
export async function sendContactEmailNodemailer(formData: ContactFormData): Promise<boolean> {
  try {
    const transporter = createNodemailerTransporter();
    if (!transporter) {
      console.warn('Nodemailer not configured - checking other email methods');
      return false;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'princekumar5252@gmail.com',
      subject: `Portfolio Contact: ${formData.subject}`,
      replyTo: formData.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0; color: white;">💼 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${formData.name}</p>
            <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${formData.email}</p>
            <p style="margin: 5px 0;"><strong>📝 Subject:</strong> ${formData.subject}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; margin-top: 10px;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Message</h3>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6; color: #334155;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 15px; margin-top: 10px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              📅 Received: ${new Date().toLocaleString()} | 
              🌐 Portfolio Contact Form | 
              💌 Reply to: ${formData.email}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission from Portfolio Website

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Received: ${new Date().toLocaleString()}
Reply to: ${formData.email}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Nodemailer');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return true;
  } catch (error: any) {
    console.error('❌ Nodemailer error details:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return false;
  }
}

// Alternative email function - tries Gmail first, then SendGrid
export async function sendContactEmailAlternative(formData: ContactFormData): Promise<boolean> {
  // Try Gmail/Nodemailer first
  console.log('📧 Attempting to send email via Gmail SMTP...');
  const nodemailerResult = await sendContactEmailNodemailer(formData);
  if (nodemailerResult) {
    return true;
  }

  // Fallback to SendGrid if Gmail fails
  console.log('📧 Gmail failed, trying SendGrid...');
  try {
    const service = getMailService();
    if (!service) {
      console.log('⚠️ No email service available - message saved to database only');
      return false;
    }

    const emailContent = {
      to: 'princekumar5252@gmail.com',
      from: 'princekumar5252@gmail.com', // Must be verified in SendGrid
      subject: `Portfolio Contact: ${formData.subject}`,
      replyTo: formData.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0; color: white;">💼 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${formData.name}</p>
            <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${formData.email}</p>
            <p style="margin: 5px 0;"><strong>📝 Subject:</strong> ${formData.subject}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; margin-top: 10px;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Message</h3>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6; color: #334155;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 15px; margin-top: 10px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              📅 Received: ${new Date().toLocaleString()} | 
              🌐 Portfolio Contact Form | 
              💌 Reply to: ${formData.email}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Received: ${new Date().toLocaleString()}
Reply to: ${formData.email}
      `
    };

    await service.send(emailContent);
    console.log('✅ Email sent successfully via SendGrid');
    return true;
  } catch (error: any) {
    console.error('❌ All email services failed');
    return false;
  }
}