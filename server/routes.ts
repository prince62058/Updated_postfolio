import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmailAlternative } from "./email";
import { insertContactSubmissionSchema } from "../shared/mongodb-schema";

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
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

      // Store in database first (so we don't lose the message even if email fails)
      const storedSubmission = await storage.createContactSubmission(submissionData);
      
      // Try to send email notification
      const emailSent = await sendContactEmailAlternative(submissionData);

      if (emailSent) {
        return res.json({ 
          success: true, 
          message: 'Message sent and stored successfully!',
          submissionId: storedSubmission.id
        });
      } else {
        // Even if email fails, we still stored the submission in database
        return res.json({ 
          success: true, 
          message: 'Message stored successfully! We will review it soon.',
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
  });

  // Resume download endpoint
  app.get("/api/resume/download", async (req, res) => {
    try {
      const resume = await storage.getActiveResume();
      
      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      // Convert fileData to Buffer if needed
      const buffer = Buffer.isBuffer(resume.fileData) 
        ? resume.fileData 
        : Buffer.from(resume.fileData);
      
      // Set proper headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.filename}"`);
      res.setHeader('Content-Length', buffer.length.toString());
      
      // Send the binary data
      return res.send(buffer);
      
    } catch (error) {
      console.error('Resume download error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error downloading resume' 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: 'ok',
      message: 'Portfolio API is running',
      endpoints: ['/api/contact', '/api/resume/download']
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
