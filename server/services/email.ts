
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

let transporter: nodemailer.Transporter | null = null;

// Create transporter only once (singleton pattern)
function getTransporter() {
  if (!transporter) {
    const gmailUser = process.env.GMAIL_USER || 'princekumar5252@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      throw new Error('GMAIL_APP_PASSWORD not configured');
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    console.log('📧 Sending email via Gmail SMTP...');

    const gmailUser = process.env.GMAIL_USER || 'princekumar5252@gmail.com';
    const transporter = getTransporter();

    const htmlMessage = `
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
            📅 Received: ${new Date().toLocaleString()} |
            🌐 Portfolio Contact Form |
            💌 Reply to: ${formData.email}
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Portfolio Contact <${gmailUser}>`,
      to: gmailUser,
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.subject}`,
      html: htmlMessage,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Received: ${new Date().toLocaleString()}
Reply to: ${formData.email}
      `,
    });

    console.log('✅ Email sent successfully via Gmail');
    return true;
  } catch (error: any) {
    console.error('❌ Email error:', error.message);
    return false;
  }
}
