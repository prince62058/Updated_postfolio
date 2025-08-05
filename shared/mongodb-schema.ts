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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;