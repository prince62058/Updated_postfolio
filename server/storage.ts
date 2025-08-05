import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/mongodb-schema";
import { connectToMongoDB } from './mongodb';
import { MongoStorage } from './mongodb-storage';
import { nanoid } from 'nanoid';

// Storage interface - keeping the same interface for compatibility
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

// Fallback in-memory storage for development/testing
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = nanoid();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = nanoid();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      submittedAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }
}

// Initialize storage - prefer MongoDB, fallback to memory storage
async function initializeStorage(): Promise<IStorage> {
  try {
    // Try to connect to MongoDB
    await connectToMongoDB();
    const mongoStorage = new MongoStorage();
    await mongoStorage.createIndexes();
    console.log('Using MongoDB storage');
    return mongoStorage;
  } catch (error) {
    console.warn('MongoDB connection failed, falling back to memory storage:', error);
    console.log('Using in-memory storage');
    return new MemStorage();
  }
}

// Export storage instance (will be initialized async)
let storageInstance: IStorage | null = null;

export const getStorage = async (): Promise<IStorage> => {
  if (!storageInstance) {
    storageInstance = await initializeStorage();
  }
  return storageInstance;
};

// For compatibility with existing code, create a storage object
export const storage = {
  async getUser(id: string): Promise<User | undefined> {
    const storageInstance = await getStorage();
    return storageInstance.getUser(id);
  },
  async getUserByUsername(username: string): Promise<User | undefined> {
    const storageInstance = await getStorage();
    return storageInstance.getUserByUsername(username);
  },
  async createUser(user: InsertUser): Promise<User> {
    const storageInstance = await getStorage();
    return storageInstance.createUser(user);
  },
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const storageInstance = await getStorage();
    return storageInstance.createContactSubmission(submission);
  },
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const storageInstance = await getStorage();
    return storageInstance.getAllContactSubmissions();
  }
};
