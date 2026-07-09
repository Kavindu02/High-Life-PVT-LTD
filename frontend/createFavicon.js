import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.webp');
const faviconPath = path.join(publicDir, 'favicon.webp');

async function processFavicon() {
  try {
    await sharp(logoPath)
      .trim()
      .toFile(faviconPath);
    console.log('Favicon created successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

processFavicon();
