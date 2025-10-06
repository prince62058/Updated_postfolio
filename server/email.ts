import nodemailer, { Transporter } from 'nodemailer';
import sgMail from '@sendgrid/mail';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Initialize SendGrid
const sendGridKey = process.env.SENDGRID_API_KEY;
if (sendGridKey) {
  sgMail.setApiKey(sendGridKey);
}

// Send contact email with SendGrid (primary) or Gmail (fallback)
export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  // Try SendGrid first
  if (sendGridKey) {
    try {
      console.log('📧 Sending email via SendGrid...');

      const msg = {
        to: process.env.GMAIL_USER || 'princekumar5252@gmail.com',
        from: process.env.SENDGRID_FROM_EMAIL || process.env.GMAIL_USER || 'noreply@portfolio.com',
        replyTo: formData.email,
        subject: `Portfolio Contact: ${formData.subject}`,
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

      await sgMail.send(msg);
      console.log('✅ Email sent successfully via SendGrid');
      return true;
    } catch (sendGridError: any) {
      console.error('❌ SendGrid error:', sendGridError.message);
      console.log('🔄 Falling back to Gmail...');
    }
  }

  // Fallback to Gmail
  try {
    console.log('📧 Sending email via Gmail (fallback)...');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

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
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail:', info.messageId);
    return true;
  } catch (error: any) {
    console.error('❌ All email methods failed:', error.message);
    return false;
  }
}