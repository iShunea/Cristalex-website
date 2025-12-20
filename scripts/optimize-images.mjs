import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'attached_assets', 'generated_images');
const OUTPUT_DIR = path.join(__dirname, '..', 'attached_assets', 'optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png'));

  console.log(`Found ${files.length} PNG images to optimize`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputPath = path.join(IMAGES_DIR, file); // Overwrite original

    const originalStats = fs.statSync(inputPath);
    totalOriginal += originalStats.size;

    try {
      // Optimize PNG - resize to max 1200px width, compress
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let pipeline = image;

      // Resize if larger than 1200px
      if (metadata.width && metadata.width > 1200) {
        pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
      }

      // Optimize PNG with maximum compression
      const buffer = await pipeline
        .png({
          quality: 80,
          compressionLevel: 9,
          palette: true,
          effort: 10
        })
        .toBuffer();

      fs.writeFileSync(outputPath, buffer);

      const newStats = fs.statSync(outputPath);
      totalOptimized += newStats.size;

      const reduction = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`✓ ${file}: ${(originalStats.size / 1024).toFixed(0)}KB → ${(newStats.size / 1024).toFixed(0)}KB (${reduction}% reduction)`);

    } catch (err) {
      console.error(`✗ Failed to optimize ${file}:`, err.message);
    }
  }

  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalOptimized / 1024 / 1024).toFixed(2)}MB (${totalReduction}% reduction)`);
}

optimizeImages();
