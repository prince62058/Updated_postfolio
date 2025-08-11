// Build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vite build...');
execSync('vite build', { stdio: 'inherit' });

// Create dist root directory and copy index.html
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(distDir, 'public');
const rootIndexPath = path.join(distDir, 'index.html');
const publicIndexPath = path.join(publicDir, 'index.html');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html to root of dist for Vercel
if (fs.existsSync(publicIndexPath)) {
  console.log('Copying index.html to dist root...');
  fs.copyFileSync(publicIndexPath, rootIndexPath);
} else {
  console.log('Creating index.html from template...');
  const clientIndexPath = path.join(__dirname, 'client', 'index.html');
  if (fs.existsSync(clientIndexPath)) {
    fs.copyFileSync(clientIndexPath, rootIndexPath);
  }
}

console.log('Build completed successfully!');