import { defineConfig } from 'drizzle-kit';

// Defining the configuration setup for Drizzle ORM
// Specify the SQL dialect we will work with, since this is Supabase, we work with postgresql
export default defineConfig({
  schema: './db/schema/User.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});