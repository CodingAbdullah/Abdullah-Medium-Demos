"use client";

import { UploadDropzone } from "@uploadthing/react";

// Custom home page component
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-10">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Uploaded:", res);
          alert("Upload complete!");
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </main>
  );
}
