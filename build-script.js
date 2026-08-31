import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy manifest.json
fs.copyFileSync(
  path.join(__dirname, 'manifest.json'),
  path.join(distDir, 'manifest.json')
);

// Copy popup.html
fs.copyFileSync(
  path.join(__dirname, 'popup.html'),
  path.join(distDir, 'popup.html')
);

// Vite already outputs popup.css to dist, no need to copy

// Copy images directory if it exists
const imagesDir = path.join(__dirname, 'images');
if (fs.existsSync(imagesDir)) {
  const distImagesDir = path.join(distDir, 'images');
  if (!fs.existsSync(distImagesDir)) {
    fs.mkdirSync(distImagesDir, { recursive: true });
  }
  
  fs.readdirSync(imagesDir).forEach(file => {
    fs.copyFileSync(
      path.join(imagesDir, file),
      path.join(distImagesDir, file)
    );
  });
}

console.log('Build completed: manifest, HTML, and images copied to dist/');

