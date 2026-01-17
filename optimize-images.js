const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'assets', 'images');
const outputDir = path.join(__dirname, 'assets', 'images', 'optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function processDirectory(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
                // Skip the output directory to prevent infinite loops
                if (path.resolve(fullPath) === path.resolve(outputDir)) return;
                processDirectory(fullPath);
                return;
            }

            const ext = path.extname(entry.name).toLowerCase();
            if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

            // Calculate output path maintaining subdirectory structure relative to imagesDir
            const relativePath = path.relative(imagesDir, fullPath);
            const outputPath = path.join(outputDir, relativePath);
            const outputDirForFile = path.dirname(outputPath);

            if (!fs.existsSync(outputDirForFile)) {
                fs.mkdirSync(outputDirForFile, { recursive: true });
            }

            console.log(`Optimizing: ${relativePath}`);

            let pipeline = sharp(fullPath);

            if (ext === '.jpg' || ext === '.jpeg') {
                pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
            } else if (ext === '.png') {
                pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
            } else if (ext === '.webp') {
                pipeline = pipeline.webp({ quality: 80 });
            }

            pipeline
                .resize({ width: 1920, withoutEnlargement: true, fit: 'inside' })
                .toFile(outputPath)
                .then(info => {
                    console.log(`✅ Optimized ${relativePath}: ${info.size} bytes`);
                })
                .catch(err => {
                    console.error(`❌ Error optimizing ${relativePath}:`, err);
                });
        });
    });
}

console.log('Starting image optimization...');
processDirectory(imagesDir);