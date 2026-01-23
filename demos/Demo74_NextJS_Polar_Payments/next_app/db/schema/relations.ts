import { relations } from "drizzle-orm";
import { users } from "./users";
import { orders } from "./orders";

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders)
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  })
}));
