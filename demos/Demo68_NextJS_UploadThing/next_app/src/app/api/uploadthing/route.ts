import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

// Creating route handlers for Next.js API route
export const { GET, POST } = createRouteHandler({
  router: fileRouter
});
