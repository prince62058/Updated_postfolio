import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';
import { nanoid } from 'nanoid';
import type { 
  User, 
  InsertUser, 
  ContactSubmission, 
  InsertContactSubmission,
  Resume,
  InsertResume
} from '@shared/mongodb-schema';

export interface IMongoStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  getActiveResume(): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
}

export class MongoStorage implements IMongoStorage {
  private get usersCollection(): Collection<User> | null {
    const db = getDatabase();
    return db ? db.collection<User>('users') : null;
  }

  private get contactSubmissionsCollection(): Collection<ContactSubmission> | null {
    const db = getDatabase();
    return db ? db.collection<ContactSubmission>('contact_submissions') : null;
  }

  private get resumesCollection(): Collection<Resume> | null {
    const db = getDatabase();
    return db ? db.collection<Resume>('resumes') : null;
  }

  async getUser(id: string): Promise<User | undefined> {
    const collection = this.usersCollection;
    if (!collection) return undefined;
    const user = await collection.findOne({ id });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const collection = this.usersCollection;
    if (!collection) return undefined;
    const user = await collection.findOne({ username });
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const collection = this.usersCollection;
    if (!collection) {
      throw new Error('Database not available - cannot create user');
    }
    
    const user: User = {
      id: nanoid(),
      username: insertUser.username,
      password: insertUser.password,
    };

    await collection.insertOne(user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const collection = this.contactSubmissionsCollection;
    
    const submission: ContactSubmission = {
      id: nanoid(),
      name: insertSubmission.name,
      email: insertSubmission.email,
      subject: insertSubmission.subject,
      message: insertSubmission.message,
      submittedAt: new Date(),
    };

    if (collection) {
      await collection.insertOne(submission);
    }
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const collection = this.contactSubmissionsCollection;
    if (!collection) return [];
    
    const submissions = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();
    
    return submissions;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const collection = this.resumesCollection;
    if (!collection) {
      throw new Error('Database not available - cannot create resume');
    }
    
    // Deactivate all existing resumes
    await collection.updateMany({}, { $set: { isActive: false } });

    const resume: Resume = {
      id: nanoid(),
      filename: insertResume.filename,
      contentType: insertResume.contentType,
      fileData: insertResume.fileData,
      uploadedAt: new Date(),
      isActive: true,
    };

    await collection.insertOne(resume);
    return resume;
  }

  async getActiveResume(): Promise<Resume | undefined> {
    const collection = this.resumesCollection;
    if (!collection) return undefined;
    const resume = await collection.findOne({ isActive: true });
    return resume || undefined;
  }

  async getAllResumes(): Promise<Resume[]> {
    const collection = this.resumesCollection;
    if (!collection) return [];
    
    const resumes = await collection
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();
    
    return resumes;
  }

  // Additional helper methods for MongoDB operations
  async createIndexes(): Promise<void> {
    const usersCol = this.usersCollection;
    const contactCol = this.contactSubmissionsCollection;
    
    if (!usersCol || !contactCol) {
      console.log('Database not available - skipping index creation');
      return;
    }
    
    // Create indexes for better performance
    await usersCol.createIndex({ username: 1 }, { unique: true });
    await usersCol.createIndex({ id: 1 }, { unique: true });
    await contactCol.createIndex({ submittedAt: -1 });
    await contactCol.createIndex({ id: 1 }, { unique: true });
    
    console.log('MongoDB indexes created successfully');
  }

  async getContactSubmissionById(id: string): Promise<ContactSubmission | undefined> {
    const collection = this.contactSubmissionsCollection;
    if (!collection) return undefined;
    const submission = await collection.findOne({ id });
    return submission || undefined;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const collection = this.contactSubmissionsCollection;
    if (!collection) return false;
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  async getContactSubmissionsPaginated(page: number = 1, limit: number = 10): Promise<{
    submissions: ContactSubmission[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const collection = this.contactSubmissionsCollection;
    if (!collection) {
      return {
        submissions: [],
        total: 0,
        page,
        totalPages: 0
      };
    }
    
    const skip = (page - 1) * limit;
    
    const [submissions, total] = await Promise.all([
      collection
        .find({})
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments({})
    ]);

    return {
      submissions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}