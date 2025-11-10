// This file is deprecated - using server/services/email.ts instead

import nodemailer from 'nodemailer';

interface ContactFormData {
 name: string;
 email: string;
 subject: string;
 message: string;
}

// Send contact email using Gmail SMTP via Nodemailer
export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    console.log('📧 Sending email via Gmail...');

    const gmailUser = process.env.GMAIL_USER || 'princekumar5252@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      console.error('❌ GMAIL_APP_PASSWORD not set');
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      subject: `Portfolio Contact: ${formData.subject}`,
      replyTo: formData.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0; color: white;">💼 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9; color: white;">From your portfolio website</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p style="margin: 5px 0; color: #334155;"><strong>👤 Name:</strong> ${formData.name}</p>
            <p style="margin: 5px 0; color: #334155;"><strong>📧 Email:</strong> ${formData.email}</p>
            <p style="margin: 5px 0; color: #334155;"><strong>📝 Subject:</strong> ${formData.subject}</p>
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

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail:', info.messageId);
    return true;
  } catch (error: any) {
    console.error('❌ Gmail SMTP error:', error.message);
    if (error.code) {
      console.error('   Error Code:', error.code);
    }
    return false;
  }
}