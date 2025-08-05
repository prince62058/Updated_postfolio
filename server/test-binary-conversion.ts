import { storage } from './storage';
import { connectToMongoDB } from './mongodb';

async function testBinaryConversion() {
  try {
    await connectToMongoDB();
    console.log('Connected to database');

    const resume = await storage.getActiveResume();
    
    if (!resume) {
      console.log('No active resume found');
      return;
    }

    console.log('Testing binary conversion methods...');
    const fileData = resume.fileData;
    
    console.log('Type:', typeof fileData);
    console.log('Constructor:', fileData.constructor.name);
    console.log('Properties:', Object.getOwnPropertyNames(fileData));
    
    // Try different methods to extract buffer
    if (fileData.value && typeof fileData.value === 'function') {
      const value = fileData.value();
      console.log('value() returned:', typeof value, value.constructor.name, 'length:', value.length);
      
      if (value instanceof Uint8Array) {
        const buffer = Buffer.from(value);
        console.log('Successfully converted to buffer, size:', buffer.length);
        console.log('First 20 bytes:', buffer.subarray(0, 20).toString());
      }
    }
    
    if (fileData.buffer) {
      console.log('fileData.buffer:', typeof fileData.buffer, fileData.buffer.constructor.name);
    }
    
  } catch (error) {
    console.error('Error testing binary conversion:', error);
  } finally {
    process.exit(0);
  }
}

testBinaryConversion();