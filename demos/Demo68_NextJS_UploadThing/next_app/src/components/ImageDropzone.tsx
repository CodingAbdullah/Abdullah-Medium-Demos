"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { FileRouterType } from "@/app/api/uploadthing/core";

// Image dropzone component for uploading images
export default function ImageDropzone({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <UploadDropzone<FileRouterType, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.url;
        if (url) onUpload(url);
      }}
      onUploadError={(err) => alert(err.message)}
    />
  );
}
