"use client";

import FileDropzone from "@/components/FileDropzone";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">UploadThing Demo</h1>
        <FileDropzone />
      </div>
    </main>
  );
}
