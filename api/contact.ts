import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { sendContactEmailAlternative } from '../server/email';
import { insertContactSubmissionSchema } from "../shared/mongodb-schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Validate request body using Zod schema
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data',
          errors: validationResult.error.errors
        });
      }

      const submissionData = validationResult.data;

      // Store in database
      const storedSubmission = await storage.createContactSubmission(submissionData);
      
      // Send email notification
      const emailSent = await sendContactEmailAlternative(submissionData);

      if (emailSent) {
        return res.json({ 
          success: true, 
          message: 'Message sent and stored successfully!',
          submissionId: storedSubmission.id
        });
      } else {
        // Even if email fails, we still stored the submission
        return res.json({ 
          success: true, 
          message: 'Message stored successfully! Email notification may have failed.',
          submissionId: storedSubmission.id
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error. Please try again later.' 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}