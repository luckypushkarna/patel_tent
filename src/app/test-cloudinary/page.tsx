import { CloudinaryImage } from "@/components/CloudinaryImage";

export default function TestCloudinary() {
  return (
    <div className="p-20 flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Cloudinary Integration Test</h1>
      
      <div className="border border-gray-300 shadow-xl rounded-lg overflow-hidden">
        {/* We use the sample image 'cld-sample-5' provided in your prompt */}
        <CloudinaryImage publicId="cld-sample-5" width={500} height={500} />
      </div>

      <p className="mt-8 text-gray-500">If you see an image above, Cloudinary is working perfectly!</p>
    </div>
  );
}
