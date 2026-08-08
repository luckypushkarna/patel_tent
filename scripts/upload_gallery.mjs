import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const MAPPING_FILE = path.join(rootDir, 'cloudinary-mapping.json');

async function uploadFile(filePath, folder, customPublicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: customPublicId,
      resource_type: "auto",
      eager: [
        { width: 1200, crop: "scale", quality: "auto", fetch_format: "auto" }
      ],
      eager_async: true,
    });
    console.log(`Uploaded ${path.basename(filePath)} -> ${result.public_id}`);
    return result;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error);
  }
}

async function run() {
  if (!process.env.CLOUDINARY_API_SECRET) {
    console.error("Error: Cloudinary credentials not found in .env.local");
    process.exit(1);
  }

  const galleryDir = path.join(rootDir, 'public', 'gallery');
  if (!fs.existsSync(galleryDir)) {
    console.error("Gallery directory not found at", galleryDir);
    process.exit(1);
  }

  const files = fs.readdirSync(galleryDir).filter(file => file.match(/\.(jpeg|jpg|png|webp|mp4)$/i));
  
  let mapping = {};
  if (fs.existsSync(MAPPING_FILE)) {
    mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  }

  console.log(`Found ${files.length} files in public/gallery. Starting upload...`);

  for (const file of files) {
    const filePath = path.join(galleryDir, file);
    const localPathKey = `./public/gallery/${file}`;
    
    // Only upload if not already in mapping
    if (mapping[localPathKey]) {
      console.log(`Skipping ${file} - already mapped to ${mapping[localPathKey]}`);
      continue;
    }

    // e.g. event/gallery/img_01
    const filenameWithoutExt = path.basename(file, path.extname(file));
    const publicId = `gallery_${filenameWithoutExt}`;
    
    const result = await uploadFile(filePath, 'event/gallery', publicId);
    
    if (result) {
      mapping[localPathKey] = result.public_id;
      // Save mapping progressively in case of failure
      fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
    }
  }

  console.log("Upload complete! Updated cloudinary-mapping.json.");
}

run();
