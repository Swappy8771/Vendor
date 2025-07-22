import React, { useState } from 'react';
import API from '../../../services/axios'; // ✅ Adjust path as needed

const BulkProductUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setMessage('');

      const res = await API.post('/api/products/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for FormData
        },
      });

      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 border rounded shadow">
      <h2 className="text-xl font-semibold">📦 Bulk Product Upload</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="w-full border p-2"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {uploading ? 'Uploading...' : 'Upload Excel'}
      </button>

      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default BulkProductUploader;
