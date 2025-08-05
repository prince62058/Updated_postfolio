import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
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

    await mailService.send(emailContent);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Alternative email function using a verified sender
export async function sendContactEmailAlternative(formData: ContactFormData): Promise<boolean> {
  try {
    const emailContent = {
      to: 'princekumar5252@gmail.com',
      from: 'princekumar5252@gmail.com', // Use your own verified email
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
            <p>Reply directly to: ${formData.email}</p>
          </div>
        </div>
      `
    };

    await mailService.send(emailContent);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}