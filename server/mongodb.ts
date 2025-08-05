import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    // Use environment variable or your provided MongoDB URI
    const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://Prince:Prince@myportfolio.fs5to7j.mongodb.net/?retryWrites=true&w=majority&appName=MyPortfolio';
    const dbName = process.env.MONGODB_DB_NAME || 'portfolio_db';

    console.log('Connecting to MongoDB...');
    client = new MongoClient(mongoUrl);
    await client.connect();
    
    db = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
    
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToMongoDB first.');
  }
  return db;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeMongoDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeMongoDB();
  process.exit(0);
});