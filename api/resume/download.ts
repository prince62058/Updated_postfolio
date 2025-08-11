import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const resume = await storage.getActiveResume();
      
      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      // Set proper headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.filename}"`);
      res.setHeader('Content-Length', resume.fileData.length);
      
      // Send the binary data
      return res.send(Buffer.from(resume.fileData));
      
    } catch (error) {
      console.error('Resume download error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error downloading resume' 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}