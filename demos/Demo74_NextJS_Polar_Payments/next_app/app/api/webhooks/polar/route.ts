import { Webhooks } from "@polar-sh/nextjs";
import { db } from "@/db";
import { users, orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PRODUCT_TIER_MAP } from "@/lib/polar";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  // Called when a subscription becomes active
  onSubscriptionActive: async (payload) => {
    const subscription = payload.data;
    const tier = PRODUCT_TIER_MAP[subscription.productId] ?? "basic";

    console.log(
      `[Polar Webhook] Subscription active: ${subscription.id}, tier: ${tier}`
    );

    // Update user subscription status
    await db
      .update(users)
      .set({
        isSubscribed: true,
        subscriptionTier: tier,
        polarSubscriptionId: subscription.id,
        subscriptionStartDate: subscription.currentPeriodStart,
        subscriptionEndDate: subscription.currentPeriodEnd ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(users.polarCustomerId, subscription.customerId));
  },

  // Called when a subscription is revoked (access should be removed)
  onSubscriptionRevoked: async (payload) => {
    const subscription = payload.data;

    console.log(`[Polar Webhook] Subscription revoked: ${subscription.id}`);

    // Downgrade user to free tier
    await db
      .update(users)
      .set({
        isSubscribed: false,
        subscriptionTier: "free",
        polarSubscriptionId: null,
        subscriptionEndDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.polarCustomerId, subscription.customerId));
  },

  // Called when a subscription is canceled (but might still be active until period end)
  onSubscriptionCanceled: async (payload) => {
    const subscription = payload.data;

    console.log(`[Polar Webhook] Subscription canceled: ${subscription.id}`);

    // Just log for now - the user still has access until subscriptionRevoked
    // You could update UI to show "Canceling at period end" state
  },

  // Called when an order is paid
  onOrderPaid: async (payload) => {
    const order = payload.data;

    // productId can be null for orders, skip if no product
    if (!order.productId) {
      console.log(`[Polar Webhook] Order ${order.id} has no product, skipping`);
      return;
    }

    const tier = PRODUCT_TIER_MAP[order.productId] ?? "basic";

    console.log(`[Polar Webhook] Order paid: ${order.id}, tier: ${tier}`);

    // Find user by Polar customer ID
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.polarCustomerId, order.customerId));

    if (!user) {
      console.error(
        `[Polar Webhook] User not found for customer: ${order.customerId}`
      );
      return;
    }

    // Record the order
    await db.insert(orders).values({
      userId: user.id,
      polarOrderId: order.id,
      polarProductId: order.productId,
      subscriptionTier: tier,
      amount: order.totalAmount,
      currency: order.currency,
      status: "paid",
      billingReason: order.billingReason as
        | "purchase"
        | "subscription_create"
        | "subscription_cycle"
        | "subscription_update",
      periodStart: order.subscription?.currentPeriodStart ?? null,
      periodEnd: order.subscription?.currentPeriodEnd ?? null,
    });
  },

  // Called when an order is refunded
  onOrderRefunded: async (payload) => {
    const order = payload.data;

    console.log(`[Polar Webhook] Order refunded: ${order.id}`);

    // Update order status
    await db
      .update(orders)
      .set({
        status: "refunded",
        updatedAt: new Date(),
      })
      .where(eq(orders.polarOrderId, order.id));
  },

  // Called when a new customer is created in Polar
  onCustomerCreated: async (payload) => {
    const customer = payload.data;

    console.log(`[Polar Webhook] Customer created: ${customer.id}`);

    // If customer has externalId (clerk user id), link them
    if (customer.externalId) {
      await db
        .update(users)
        .set({
          polarCustomerId: customer.id,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, customer.externalId));
    }
  },
});
