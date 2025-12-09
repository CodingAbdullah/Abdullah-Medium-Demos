"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

export default function FileDropzone() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.url;
      if (url) {
        setUploadedUrl(url);
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      alert(`Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  });

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setIsUploading(true);
      startUpload(files);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileInput}
        disabled={isUploading}
        accept="image/*"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      {isUploading && <p className="text-sm text-gray-600">Uploading...</p>}

      {uploadedUrl && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium mb-2">Upload successful!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline break-all"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
