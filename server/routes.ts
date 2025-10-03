import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmailAlternative } from './email';
import { insertContactSubmissionSchema } from "@shared/mongodb-schema";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // n8n Chat Proxy to bypass CORS
  app.post('/api/n8n-chat', async (req, res) => {
    try {
      const response = await fetch('https://prince5252.app.n8n.cloud/webhook/13e126da-a9f8-468b-b2f1-e8347f511182/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('n8n proxy error:', error);
      res.status(500).json({ error: 'Failed to connect to chatbot' });
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

  // Seed database endpoint for testing
  app.post('/api/seed-database', async (req, res) => {
    try {
      // Sample contact form submissions
      const sampleSubmissions = [
        {
          name: "Sarah Johnson",
          email: "sarah.johnson@techcorp.com",
          subject: "Web Development Project Inquiry",
          message: "Hi Prince! I came across your portfolio and I'm impressed with your MERN stack projects. We have an exciting opportunity for a full-stack web application that involves React, Node.js, and MongoDB. Would you be interested in discussing this project? We're looking for someone with your skill set to build a customer management system with real-time features."
        },
        {
          name: "Michael Chen",
          email: "m.chen@startupventure.io",
          subject: "AI/ML Collaboration Opportunity",
          message: "Hello Prince, I'm the CTO at a growing startup focused on AI-powered analytics. Your background in AI/ML and full-stack development is exactly what we need. We're building a platform that processes large datasets and displays insights through interactive dashboards. Would you like to schedule a call to discuss potential collaboration?"
        },
        {
          name: "Emily Rodriguez",
          email: "emily.r@designstudio.com",
          subject: "Freelance Project - E-commerce Platform",
          message: "Hi there! I'm a UI/UX designer looking for a skilled developer to bring our e-commerce designs to life. The project involves building a modern online store with features like user authentication, payment integration, and admin dashboard. Your portfolio shows great attention to detail and technical expertise. Are you available for freelance work?"
        },
        {
          name: "David Kumar",
          email: "david.kumar@university.edu",
          subject: "Research Collaboration Invitation",
          message: "Dear Prince, I'm a professor at the Computer Science department and I'm impressed by your AI/ML projects. We're conducting research on machine learning applications in web development and could use someone with your practical experience. This would be a great opportunity to contribute to academic research while working on cutting-edge projects. Interested?"
        },
        {
          name: "Lisa Thompson",
          email: "lisa.thompson@nonprofit.org",
          subject: "Volunteer Development Opportunity",
          message: "Hello Prince! I represent a nonprofit organization that helps underprivileged students learn coding. We're looking for volunteers to help build an online learning platform. Your skills in React and Node.js would be incredibly valuable. This would be a great way to give back to the community while gaining experience with educational technology. Would you consider joining our mission?"
        }
      ];

      let addedCount = 0;
      
      for (const submission of sampleSubmissions) {
        try {
          await storage.createContactSubmission(submission);
          addedCount++;
        } catch (error) {
          console.error('Error adding submission:', error);
        }
      }

      res.json({
        success: true,
        message: `Successfully added ${addedCount} sample submissions to database`,
        addedCount
      });
      
    } catch (error) {
      console.error('Database seeding error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to seed database'
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

  // Resume download endpoint
  app.get('/api/resume/download', async (req, res) => {
    try {
      const resume = await storage.getActiveResume();
      
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }

      // Handle MongoDB Binary objects properly
      let fileBuffer: Buffer;
      
      if (Buffer.isBuffer(resume.fileData)) {
        fileBuffer = resume.fileData;
      } else if (resume.fileData && typeof (resume.fileData as any).value === 'function') {
        // MongoDB Binary object - call value() to get the Buffer
        fileBuffer = (resume.fileData as any).value();
      } else if (resume.fileData && (resume.fileData as any).buffer) {
        // Alternative format - use the buffer property directly
        fileBuffer = (resume.fileData as any).buffer;
      } else {
        // Fallback
        fileBuffer = Buffer.from(resume.fileData as ArrayBuffer);
      }

      if (!fileBuffer || fileBuffer.length === 0) {
        return res.status(500).json({
          success: false,
          message: 'Resume file is empty'
        });
      }

      // Set headers and send file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.filename}"`);
      res.setHeader('Cache-Control', 'no-cache');
      
      // Send the buffer directly
      res.end(fileBuffer);
    } catch (error) {
      console.error('Resume download error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to download resume'
      });
    }
  });

  // Resume update endpoint (for internal use)
  app.post('/api/resume/update-from-file', async (req, res) => {
    try {
      const { filePath } = req.body;
      
      if (!filePath) {
        return res.status(400).json({
          success: false,
          message: 'File path is required'
        });
      }

      // Read the file from the provided path
      const fs = await import('fs');
      const path = await import('path');
      
      const resumePath = path.join(process.cwd(), filePath);
      
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({
          success: false,
          message: 'Resume file not found'
        });
      }

      const fileBuffer = fs.readFileSync(resumePath);
      
      // First, get all existing resumes to verify removal
      const existingResumes = await storage.getAllResumes();
      console.log('Existing resumes before update:', existingResumes.length);

      // Use storage to create new resume (this should deactivate old ones)
      const resumeData = {
        filename: 'Prince_Kumar_Updated_Resume.pdf',
        contentType: 'application/pdf',
        fileData: fileBuffer as Buffer
      };

      const result = await storage.createResume({
        ...resumeData,
        fileData: resumeData.fileData as any
      });
      
      // Verify the new resume is active
      const newActiveResume = await storage.getActiveResume();
      console.log('New active resume:', newActiveResume?.filename);
      
      res.json({
        success: true,
        message: 'Resume updated successfully',
        resumeId: result.id,
        size: fileBuffer.length
      });

    } catch (error) {
      console.error('Resume update error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update resume'
      });
    }
  });

  // Get resume info endpoint
  app.get('/api/resume/info', async (req, res) => {
    try {
      const resume = await storage.getActiveResume();
      
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }

      // Return resume info without the file data
      const resumeInfo = {
        id: resume.id,
        filename: resume.filename,
        contentType: resume.contentType,
        uploadedAt: resume.uploadedAt,
        isActive: resume.isActive
      };

      res.json({
        success: true,
        resume: resumeInfo
      });
    } catch (error) {
      console.error('Resume info error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get resume info'
      });
    }
  });

  // Upload/Initialize resume endpoint (for initial setup)
  app.post('/api/resume/upload', async (req, res) => {
    try {
      const { filename, contentType, fileData } = req.body;

      if (!filename || !contentType || !fileData) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: filename, contentType, fileData'
        });
      }

      // Convert base64 to Buffer if needed
      let buffer: Buffer;
      if (typeof fileData === 'string') {
        buffer = Buffer.from(fileData, 'base64');
      } else {
        buffer = Buffer.from(fileData as ArrayBuffer);
      }

      const resume = await storage.createResume({
        filename,
        contentType,
        fileData: buffer as any
      });

      res.json({
        success: true,
        message: 'Resume uploaded successfully',
        resumeId: resume.id
      });
    } catch (error) {
      console.error('Resume upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload resume'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}