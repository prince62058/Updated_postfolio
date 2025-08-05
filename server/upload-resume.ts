import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './storage';
import { connectToMongoDB } from './mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadResumeToDatabase() {
  try {
    // Connect to database first
    await connectToMongoDB();
    console.log('Connected to database');

    // Read the PDF file  
    const resumePath = path.join(__dirname, '..', 'attached_assets', 'PrinceUpdatedResume_1754425254244.pdf');
    
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found at:', resumePath);
      return;
    }

    const fileData = fs.readFileSync(resumePath);
    const filename = 'Prince_Kumar_Resume.pdf';
    const contentType = 'application/pdf';

    console.log(`Uploading resume: ${filename} (${fileData.length} bytes)`);

    // Store in database
    const resume = await storage.createResume({
      filename,
      contentType, 
      fileData
    });

    console.log('Resume uploaded successfully!');
    console.log('Resume ID:', resume.id);
    console.log('Filename:', resume.filename);
    console.log('Upload date:', resume.uploadedAt);
    
  } catch (error) {
    console.error('Error uploading resume:', error);
  } finally {
    process.exit(0);
  }
}

// Run the upload
uploadResumeToDatabase();