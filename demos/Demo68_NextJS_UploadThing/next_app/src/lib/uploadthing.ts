import { generateReactHelpers } from "@uploadthing/react";
import type { FileRouterType } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<FileRouterType>();
