import nodemailer, { Transporter } from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create Gmail transporter with proper timeouts and pooling
function createGmailTransporter(): Transporter {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    throw new Error('Gmail credentials are not configured in environment variables');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
    pool: true,
    maxConnections: 5,
    maxMessages: 20,
  });
}

// Singleton transporter
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = createGmailTransporter();
  }
  return transporter;
}

// Send contact email
export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    console.log('📧 Sending email via Gmail...');

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${formData.subject}`,
      replyTo: formData.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0;">💼 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p><strong>👤 Name:</strong> ${formData.name}</p>
            <p><strong>📧 Email:</strong> ${formData.email}</p>
            <p><strong>📝 Subject:</strong> ${formData.subject}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; margin-top: 10px;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Message</h3>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6; color: #334155;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #f8fafc; padding: 15px; margin-top: 10px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              📅 Received: ${new Date().toLocaleString()} | 🌐 Portfolio Contact Form | 💌 Reply to: ${formData.email}
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
      `,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail:', info.messageId);
    return true;
  } catch (error: any) {
    console.error('❌ Gmail sending error:', error.message);
    return false;
  }
}
