import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "free",
  "basic",
  "pro",
  "enterprise"
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),

  // Subscription state
  isSubscribed: boolean("is_subscribed").default(false).notNull(),
  subscriptionTier: subscriptionTierEnum("subscription_tier")
    .default("free")
    .notNull(),

  // Polar references
  polarCustomerId: text("polar_customer_id").unique(),
  polarSubscriptionId: text("polar_subscription_id"),

  // Subscription dates
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Relations are defined in a separate file to avoid circular imports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
