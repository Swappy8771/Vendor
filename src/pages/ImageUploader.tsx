import React, { useState } from 'react';
import { uploadToCloudinary } from '../utils/uploadToCloudinary'; // ✅ must return { url, public_id }

interface UploadedImage {
  url: string;
  public_id: string;
}

interface ImageUploaderProps {
  onUpload: (image: UploadedImage) => void;
  multiple?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, multiple = false }) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      const uploads: UploadedImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await uploadToCloudinary(file); // ✅ ensure result is { url, public_id }

        // ✅ ensure correct structure
        if (typeof result === 'object' && result.url && result.public_id) {
          uploads.push(result);
          onUpload(result); // pass full object back to parent
        }
      }

      // ✅ strictly an array of UploadedImage
      setUploadedImages((prev: UploadedImage[]) => [...prev, ...uploads]);
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && <p className="text-blue-600">Uploading...</p>}

      <div className="flex flex-wrap gap-4">
        {uploadedImages.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Uploaded"
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
