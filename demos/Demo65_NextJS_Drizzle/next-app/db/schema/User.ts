import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Creating and exporting a User table schema
// Utilizing built-in functions for setting the attribute names, column conditions, constraints
export const Users = pgTable("Users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});
