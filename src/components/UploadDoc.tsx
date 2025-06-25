// components/UploadDoc.tsx
'use client';

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export function UploadDoc() {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      toast.error('Please select a document to upload.');
      return;
    }

    const file = files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size exceeds 2MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      toast.success('Document uploaded successfully!');
      fileInputRef.current? fileInputRef.current.value = '': null;
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Document</h2>
      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          className="flex-1 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}
