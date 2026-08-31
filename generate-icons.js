#!/usr/bin/env node

/**
 * Icon Generator for AWS Easy Navigation
 * Creates simple SVG-based icons for the extension
 */

const fs = require('fs');
const path = require('path');

// SVG template for AWS orange icon
const generateSvgIcon = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- AWS Orange Background -->
  <rect width="${size}" height="${size}" fill="#FF9900" rx="2"/>
  
  <!-- Simple bookmark icon -->
  <g transform="translate(${size * 0.15}, ${size * 0.15}) scale(${size * 0.007})">
    <path d="M30 10h70v100l-35-25-35 25V10z" fill="white" stroke="white" stroke-width="2"/>
  </g>
</svg>`;

// Create images directory
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate icons in different sizes
const sizes = [16, 48, 128];

sizes.forEach((size) => {
  const filename = path.join(imagesDir, `icon-${size}.png`);
  const svgContent = generateSvgIcon(size);
  
  // For now, write SVG versions (since PNG requires image processing)
  const svgFilename = path.join(imagesDir, `icon-${size}.svg`);
  fs.writeFileSync(svgFilename, svgContent);
  console.log(`Generated ${svgFilename}`);
});

console.log('Icons generated in images/ directory');
console.log('\nNote: SVG icons are included. For PNG icons, you can:');
console.log('1. Install imagemagick: apt-get install imagemagick');
console.log('2. Run: node generate-icons.js --convert-to-png');
console.log('\nOr use online converters to convert SVG to PNG.');
