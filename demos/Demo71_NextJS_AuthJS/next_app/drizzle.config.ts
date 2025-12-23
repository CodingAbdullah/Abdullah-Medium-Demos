import { defineConfig } from 'drizzle-kit'

// Setting up Drizzle ORM configuration
export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});