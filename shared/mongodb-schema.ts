import { z } from "zod";
import { ObjectId } from "mongodb";

// MongoDB document interfaces
export interface User {
  _id?: ObjectId;
  id: string;
  username: string;
  password: string;
}

export interface ContactSubmission {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

export interface Resume {
  _id?: ObjectId;
  id: string;
  filename: string;
  contentType: string;
  fileData: Buffer;
  uploadedAt: Date;
  isActive: boolean;
}

// Validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export const insertResumeSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  fileData: z.instanceof(Buffer),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertResume = z.infer<typeof insertResumeSchema>;