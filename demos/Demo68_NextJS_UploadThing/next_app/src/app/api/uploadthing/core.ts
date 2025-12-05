import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// File router definition for uploading images
export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url };
    }
  ),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
