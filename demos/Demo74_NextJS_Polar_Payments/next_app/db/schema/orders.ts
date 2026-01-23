import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { users, subscriptionTierEnum } from "./users";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "refunded",
  "failed"
]);

export const billingReasonEnum = pgEnum("billing_reason", [
  "purchase",
  "subscription_create",
  "subscription_cycle",
  "subscription_update"
]);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),

  // User reference
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Polar references
  polarOrderId: text("polar_order_id").notNull().unique(),
  polarProductId: text("polar_product_id").notNull(),

  // Order details
  subscriptionTier: subscriptionTierEnum("subscription_tier").notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").default("usd").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  billingReason: billingReasonEnum("billing_reason").notNull(),

  // Period for subscription orders
  periodStart: timestamp("period_start"),
  periodEnd: timestamp("period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Relations are defined in relations.ts to avoid circular imports
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
