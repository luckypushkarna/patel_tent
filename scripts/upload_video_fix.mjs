import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
  console.log("Starting video upload...");
  cloudinary.uploader.upload_large("14816011_2160_3840_30fps.mp4", {
    folder: "event",
    resource_type: "video",
    chunk_size: 20000000
  }, (error, result) => {
    if (error) {
      console.error("Upload error:", error);
    } else {
      console.log("Upload success! ID:", result.public_id);
    }
  });
}

run();
