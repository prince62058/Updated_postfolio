import dotenv from 'dotenv';
dotenv.config();

import sgMail from '@sendgrid/mail';

async function testSendGridEmail() {
  console.log('🧪 Testing SendGrid Email Configuration...\n');
  
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  
  console.log('📋 Configuration:');
  console.log(`   API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET'}`);
  console.log(`   From Email: ${fromEmail || 'NOT SET'}`);
  console.log(`   To Email: ${fromEmail || 'NOT SET'}\n`);
  
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY is not set!');
    process.exit(1);
  }
  
  if (!fromEmail) {
    console.error('❌ SENDGRID_FROM_EMAIL is not set!');
    process.exit(1);
  }
  
  try {
    console.log('🔑 Setting API Key...');
    sgMail.setApiKey(apiKey);
    
    console.log('📧 Preparing test email...');
    const msg = {
      to: fromEmail,
      from: fromEmail,
      subject: '✅ Test Email from Portfolio - SendGrid Working!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 12px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 32px;">✅ Success!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">SendGrid Email is Working Perfectly</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; margin-top: 20px; border-radius: 8px;">
            <h2 style="color: #1f2937; margin-top: 0;">🎉 Congratulations, Prince!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Your portfolio contact form is now fully configured and ready to receive messages. 
              When someone fills out your contact form, you'll receive an email just like this one.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #10b981;">
              <h3 style="color: #1f2937; margin-top: 0;">✨ What's Working:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li>✅ SendGrid API Connection</li>
                <li>✅ Email Authentication</li>
                <li>✅ Sender Verification</li>
                <li>✅ HTML Email Formatting</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; margin-top: 20px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              📅 Sent: ${new Date().toLocaleString()}<br>
              🌐 From: Prince Kumar Portfolio<br>
              💌 To: ${fromEmail}
            </p>
          </div>
        </div>
      `,
      text: `
✅ SendGrid Test Email - Success!

Congratulations, Prince!

Your portfolio contact form email system is now fully configured and working.

What's Working:
- SendGrid API Connection
- Email Authentication  
- Sender Verification
- HTML Email Formatting

Sent: ${new Date().toLocaleString()}
From: Prince Kumar Portfolio
To: ${fromEmail}
      `
    };
    
    console.log('📤 Sending email to:', fromEmail);
    console.log('📨 From:', fromEmail);
    
    const response = await sgMail.send(msg);
    
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log('📬 Status Code:', response[0].statusCode);
    console.log('📧 Check your email:', fromEmail);
    console.log('\n🎉 SendGrid is configured correctly!');
    console.log('💡 Your contact form will now send emails automatically.\n');
    
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ EMAIL SEND FAILED!');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    
    if (error.response) {
      console.error('\n📋 Response Details:');
      console.error('Status:', error.response.statusCode);
      console.error('Body:', JSON.stringify(error.response.body, null, 2));
    }
    
    console.error('\n🔧 TROUBLESHOOTING:');
    
    if (error.code === 401 || error.message.includes('Unauthorized')) {
      console.error('   ❌ API Key is invalid or unauthorized');
      console.error('   📝 Solution:');
      console.error('      1. Go to: https://app.sendgrid.com/settings/api_keys');
      console.error('      2. Create a new API key with "Full Access" permissions');
      console.error('      3. Copy the FULL key (starts with SG. and is ~69 characters)');
      console.error('      4. Update SENDGRID_API_KEY secret in Replit\n');
    } else if (error.code === 403 || error.message.includes('Forbidden')) {
      console.error('   ❌ Sender email is not verified');
      console.error('   📝 Solution:');
      console.error('      1. Go to: https://app.sendgrid.com/settings/sender_auth/senders');
      console.error('      2. Verify your sender email:', fromEmail);
      console.error('      3. Check your inbox for verification link\n');
    } else {
      console.error('   ❌ Unknown error occurred');
      console.error('   📝 Check SendGrid dashboard for more details\n');
    }
    
    process.exit(1);
  }
}

testSendGridEmail();
