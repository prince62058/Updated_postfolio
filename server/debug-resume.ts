import { storage } from './storage';
import { connectToMongoDB } from './mongodb';

async function debugResume() {
  try {
    await connectToMongoDB();
    console.log('Connected to database');

    const resume = await storage.getActiveResume();
    
    if (!resume) {
      console.log('No active resume found');
      return;
    }

    console.log('Resume info:');
    console.log('- ID:', resume.id);
    console.log('- Filename:', resume.filename);
    console.log('- Content Type:', resume.contentType);
    console.log('- Upload Date:', resume.uploadedAt);
    console.log('- Is Active:', resume.isActive);
    console.log('- File Data Type:', typeof resume.fileData);
    console.log('- Is Buffer:', Buffer.isBuffer(resume.fileData));
    console.log('- File Data Constructor:', resume.fileData.constructor.name);
    
    if (resume.fileData && resume.fileData.length) {
      console.log('- File Size:', resume.fileData.length);
      console.log('- First 10 bytes:', resume.fileData.subarray ? resume.fileData.subarray(0, 10) : 'no subarray method');
    } else {
      console.log('- No file data found');
    }
    
  } catch (error) {
    console.error('Error debugging resume:', error);
  } finally {
    process.exit(0);
  }
}

debugResume();