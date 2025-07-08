export const uploadToCloudinary = async (file: File): Promise<string> => {
  const url = `https://api.cloudinary.com/v1_1/dp0jcmp5u/upload`; // ✅ correct cloud name
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', 'ecommerce_uploads'); // ✅ correct preset name

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Cloudinary error:", error);
    throw new Error(error.error?.message || 'Failed to upload image');
  }

  const data = await res.json();
  return data.secure_url;
};
