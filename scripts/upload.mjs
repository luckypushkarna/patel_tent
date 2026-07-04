import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFile(filePath, folder) {
  try {
    const result = await cloudinary.uploader.upload_large(filePath, {
      folder,
      resource_type: "auto",
      chunk_size: 20000000, // 20MB chunks
      // Add eager transformations for 60fps / optimized video delivery
      eager: [
        { width: 1920, crop: "scale", quality: "auto", fetch_format: "auto" }, // Desktop
        { width: 720, crop: "scale", quality: "auto", fetch_format: "auto" }  // Mobile
      ],
      eager_async: true,
    });
    console.log(`Uploaded ${filePath} -> ${result.public_id}`);
    return result;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error);
  }
}

async function run() {
  const rootFiles = [
    '14816011_2160_3840_30fps.mp4'
  ];
  
  for (const file of rootFiles) {
    if (fs.existsSync(file)) {
      await uploadFile(file, 'event');
    }
  }
}

run();
