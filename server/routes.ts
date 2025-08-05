import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmailAlternative } from './email';
import { insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Get all contact submissions (for admin purposes)
  app.get('/api/contact-submissions', async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json({ 
        success: true, 
        submissions 
      });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch submissions' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
