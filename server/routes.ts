import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { insertContactSubmissionSchema } from "../shared/mongodb-schema";

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }

      // Try to send email with fallback system
      let emailSent = false;
      try {
        emailSent = await sendContactEmail({ name, email, subject, message });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        emailSent = false;
      }

      // Return appropriate response based on email status
      if (emailSent) {
        return res.json({ 
          success: true, 
          message: 'Message sent successfully!' 
        });
      } else {
        // Email failed - tell user to contact directly
        return res.status(500).json({ 
          success: false, 
          message: 'Unable to send email. Please contact us directly at princekumar5252@gmail.com or call +91 9661513636' 
        });
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please contact us at princekumar5252@gmail.com' 
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

      // Handle different data formats from MongoDB
      let buffer: Buffer;

      if (Buffer.isBuffer(resume.fileData)) {
        buffer = resume.fileData;
      } else if (resume.fileData && typeof resume.fileData === 'object' && 'buffer' in resume.fileData) {
        // MongoDB Binary type has a buffer property
        buffer = Buffer.from((resume.fileData as any).buffer);
      } else if (typeof resume.fileData === 'string') {
        // Base64 string
        buffer = Buffer.from(resume.fileData, 'base64');
      } else if (Array.isArray(resume.fileData)) {
        // Array of bytes
        buffer = Buffer.from(resume.fileData);
      } else {
        console.error('Unknown fileData format:', typeof resume.fileData);
        throw new Error('Invalid file data format');
      }

      console.log(`Sending resume: ${resume.filename}, size: ${buffer.length} bytes`);

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