import { defineConfig } from "drizzle-kit";

// Drizzle configuration for PostgreSQL database
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
