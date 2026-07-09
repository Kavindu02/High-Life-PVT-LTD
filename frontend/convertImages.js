import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function processImages() {
  try {
    const files = await fs.readdir(publicDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    for (const file of pngFiles) {
      const inputPath = path.join(publicDir, file);
      const outputFilename = file.replace('.png', '.webp');
      const outputPath = path.join(publicDir, outputFilename);

      console.log(`Processing ${file}...`);

      // Convert to webp with high quality
      await sharp(inputPath)
        .webp({ quality: 90 }) // Try 90% quality first
        .toFile(outputPath);

      // Check the size
      const stats = await fs.stat(outputPath);
      const sizeKB = stats.size / 1024;
      
      console.log(`- ${outputFilename} size: ${sizeKB.toFixed(2)} KB`);

      if (sizeKB > 600) {
          console.log(`- Size is > 600KB, compressing slightly more...`);
          await sharp(inputPath)
            .webp({ quality: 80 }) // Reduce slightly if it's over 600KB
            .toFile(outputPath);
            
          const newStats = await fs.stat(outputPath);
          console.log(`- New size: ${(newStats.size / 1024).toFixed(2)} KB`);
      }

      try {
        await fs.unlink(inputPath);
        console.log(`- Deleted original ${file}`);
      } catch (e) {
        console.error(`- Could not delete ${file}:`, e.message);
      }
    }
    console.log('All done!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
