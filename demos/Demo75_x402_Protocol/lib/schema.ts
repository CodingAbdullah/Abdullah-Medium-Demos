import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  status: text("status").notNull().default("pending"),
  provider: text("provider"),
  external_id: text("external_id").unique(),
  amount: numeric("amount"),
  currency: text("currency"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
