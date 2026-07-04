import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFile(filePath, folder, customPublicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: customPublicId,
      resource_type: "auto",
      eager: [
        { width: 800, crop: "scale", quality: "auto", fetch_format: "auto" }
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
    'Fbt muse 210.jpg',
    'Stylish Delhi Wedding Where The Couple Designed Their Own Outfits.jpg',
    'download-removebg-preview.png',
    'download.jpg'
  ];
  
  for (const file of rootFiles) {
    if (fs.existsSync(file)) {
      await uploadFile(file, 'event/misc', undefined);
    }
  }

  const galleryDir = 'gallery';
  if (fs.existsSync(galleryDir)) {
    const files = fs.readdirSync(galleryDir);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.match(/\.(jpeg|jpg|png)$/i)) {
        await uploadFile(path.join(galleryDir, file), 'event/gallery', `new_${i+12}`); // Start from 12 since 1-11 might be used
      }
    }
  }
}

run();
