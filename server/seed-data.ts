import { connectToMongoDB } from './mongodb';
import { MongoStorage } from './mongodb-storage';
import type { InsertContactSubmission } from '@shared/mongodb-schema';

// Sample contact form submissions for testing
const sampleSubmissions: InsertContactSubmission[] = [
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

export async function seedDatabase(): Promise<void> {
  try {
    console.log('Connecting to MongoDB for data seeding...');
    await connectToMongoDB();
    
    const storage = new MongoStorage();
    await storage.createIndexes();
    
    console.log('Adding sample contact submissions...');
    
    for (const submission of sampleSubmissions) {
      await storage.createContactSubmission(submission);
      console.log(`Added submission from: ${submission.name}`);
    }
    
    console.log(`Successfully added ${sampleSubmissions.length} sample contact submissions!`);
    
    // Get and display all submissions to verify
    const allSubmissions = await storage.getAllContactSubmissions();
    console.log(`Total submissions in database: ${allSubmissions.length}`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}