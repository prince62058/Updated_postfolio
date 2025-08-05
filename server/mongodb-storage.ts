import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';
import { nanoid } from 'nanoid';
import type { 
  User, 
  InsertUser, 
  ContactSubmission, 
  InsertContactSubmission 
} from '@shared/mongodb-schema';

export interface IMongoStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MongoStorage implements IMongoStorage {
  private get usersCollection(): Collection<User> {
    return getDatabase().collection<User>('users');
  }

  private get contactSubmissionsCollection(): Collection<ContactSubmission> {
    return getDatabase().collection<ContactSubmission>('contact_submissions');
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await this.usersCollection.findOne({ id });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersCollection.findOne({ username });
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: nanoid(),
      username: insertUser.username,
      password: insertUser.password,
    };

    await this.usersCollection.insertOne(user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: nanoid(),
      name: insertSubmission.name,
      email: insertSubmission.email,
      subject: insertSubmission.subject,
      message: insertSubmission.message,
      submittedAt: new Date(),
    };

    await this.contactSubmissionsCollection.insertOne(submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const submissions = await this.contactSubmissionsCollection
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();
    
    return submissions;
  }

  // Additional helper methods for MongoDB operations
  async createIndexes(): Promise<void> {
    // Create indexes for better performance
    await this.usersCollection.createIndex({ username: 1 }, { unique: true });
    await this.usersCollection.createIndex({ id: 1 }, { unique: true });
    await this.contactSubmissionsCollection.createIndex({ submittedAt: -1 });
    await this.contactSubmissionsCollection.createIndex({ id: 1 }, { unique: true });
    
    console.log('MongoDB indexes created successfully');
  }

  async getContactSubmissionById(id: string): Promise<ContactSubmission | undefined> {
    const submission = await this.contactSubmissionsCollection.findOne({ id });
    return submission || undefined;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await this.contactSubmissionsCollection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  async getContactSubmissionsPaginated(page: number = 1, limit: number = 10): Promise<{
    submissions: ContactSubmission[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [submissions, total] = await Promise.all([
      this.contactSubmissionsCollection
        .find({})
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.contactSubmissionsCollection.countDocuments({})
    ]);

    return {
      submissions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}