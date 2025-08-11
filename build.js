// Build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vite build...');
execSync('vite build', { stdio: 'inherit' });

// Ensure index.html exists in dist
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.log('Creating index.html in dist directory...');
  const clientIndexPath = path.join(__dirname, 'client', 'index.html');
  if (fs.existsSync(clientIndexPath)) {
    fs.copyFileSync(clientIndexPath, indexPath);
  }
}

console.log('Build completed successfully!');