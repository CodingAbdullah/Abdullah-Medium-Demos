import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/User';

// Database connection string to establish connection to Supabase
// Database connection using an ORM is slightly different 
// We use the database URL to connect directly to Supabase
const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

// Export the database instance using drizzle
export const db = drizzle(client, { schema });