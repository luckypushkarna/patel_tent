import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
  const result = await cloudinary.search
    .expression('resource_type:video AND folder:event')
    .sort_by('created_at', 'desc')
    .max_results(5)
    .execute();
  
  for (const resource of result.resources) {
    console.log(`Video: ${resource.public_id} - ${resource.created_at}`);
  }
}

run().catch(console.error);
