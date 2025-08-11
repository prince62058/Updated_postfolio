// Vercel serverless function entry point
import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import type { Express } from "express";
import { storage } from '../server/storage';
import { sendContactEmailAlternative } from '../server/email';
import { insertContactSubmissionSchema } from "../shared/mongodb-schema";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
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
      res.json({ 
        success: true, 
        message: 'Message sent and stored successfully!',
        submissionId: storedSubmission.id
      });
    } else {
      // Even if email fails, we still stored the submission
      res.json({ 
        success: true, 
        message: 'Message stored successfully! Email notification may have failed.',
        submissionId: storedSubmission.id
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};