import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmailAlternative } from './email';
import { insertContactSubmissionSchema } from "@shared/mongodb-schema";

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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      // Check if we have access to MongoDB pagination
      const storageInstance = await import('./storage').then(m => m.getStorage());
      
      if ('getContactSubmissionsPaginated' in storageInstance) {
        // Use MongoDB pagination
        const result = await (storageInstance as any).getContactSubmissionsPaginated(page, limit);
        res.json({ 
          success: true, 
          ...result 
        });
      } else {
        // Fallback for memory storage
        const submissions = await storage.getAllContactSubmissions();
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSubmissions = submissions.slice(startIndex, endIndex);
        
        res.json({ 
          success: true, 
          submissions: paginatedSubmissions,
          total: submissions.length,
          page,
          totalPages: Math.ceil(submissions.length / limit)
        });
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch submissions' 
      });
    }
  });

  // Get single contact submission by ID
  app.get('/api/contact-submissions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const storageInstance = await import('./storage').then(m => m.getStorage());
      
      if ('getContactSubmissionById' in storageInstance) {
        const submission = await (storageInstance as any).getContactSubmissionById(id);
        if (submission) {
          res.json({ success: true, submission });
        } else {
          res.status(404).json({ success: false, message: 'Submission not found' });
        }
      } else {
        // Fallback for memory storage - search all submissions
        const submissions = await storage.getAllContactSubmissions();
        const submission = submissions.find(s => s.id === id);
        if (submission) {
          res.json({ success: true, submission });
        } else {
          res.status(404).json({ success: false, message: 'Submission not found' });
        }
      }
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch submission' 
      });
    }
  });

  // Delete contact submission (for admin purposes)
  app.delete('/api/contact-submissions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const storageInstance = await import('./storage').then(m => m.getStorage());
      
      if ('deleteContactSubmission' in storageInstance) {
        const deleted = await (storageInstance as any).deleteContactSubmission(id);
        if (deleted) {
          res.json({ success: true, message: 'Submission deleted successfully' });
        } else {
          res.status(404).json({ success: false, message: 'Submission not found' });
        }
      } else {
        res.status(501).json({ 
          success: false, 
          message: 'Delete operation not supported with current storage' 
        });
      }
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete submission' 
      });
    }
  });

  // Database status endpoint
  app.get('/api/database-status', async (req, res) => {
    try {
      const storageInstance = await import('./storage').then(m => m.getStorage());
      const isDatabaseConnected = 'createIndexes' in storageInstance;
      
      res.json({
        success: true,
        database: {
          type: isDatabaseConnected ? 'MongoDB' : 'Memory',
          connected: isDatabaseConnected,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error checking database status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to check database status'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
