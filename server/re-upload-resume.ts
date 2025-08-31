import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './storage';
import { connectToMongoDB } from './mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function reUploadResume() {
  try {
    // Connect to database first
    await connectToMongoDB();
    console.log('Connected to database');

    // Read the PDF file from the correct path
    const resumePath = process.argv[2] || path.join(__dirname, '..', 'attached_assets', 'PrinceUpdatedResume_1754425254244.pdf');
    
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found at:', resumePath);
      console.log('Checking directory contents:');
      const assetsDir = path.join(__dirname, '..', 'attached_assets');
      if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);
        console.log('Files in attached_assets:', files);
      }
      return;
    }

    const fileData = fs.readFileSync(resumePath);
    console.log(`File size: ${fileData.length} bytes`);
    console.log(`First few bytes: ${fileData.subarray(0, 10).toString()}`);

    // Check if it's a valid PDF (should start with %PDF)
    const pdfHeader = fileData.subarray(0, 4).toString();
    if (pdfHeader !== '%PDF') {
      console.error('File does not appear to be a valid PDF');
      return;
    }

    const filename = 'Prince_Kumar_Resume.pdf';
    const contentType = 'application/pdf';

    console.log(`Re-uploading resume: ${filename}`);

    // Store in database - this will deactivate the old one
    const resume = await storage.createResume({
      filename,
      contentType, 
      fileData
    });

    console.log('Resume re-uploaded successfully!');
    console.log('Resume ID:', resume.id);
    console.log('Filename:', resume.filename);
    console.log('File size in DB:', resume.fileData.length);
    
  } catch (error) {
    console.error('Error re-uploading resume:', error);
  } finally {
    process.exit(0);
  }
}

// Run the re-upload
reUploadResume();