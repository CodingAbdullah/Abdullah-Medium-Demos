import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookVerificationError } from "standardwebhooks";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Map Polar product IDs to subscription tiers
const PRODUCT_TO_TIER: Record<string, "free" | "basic" | "pro"> = {
  [process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID!]: "basic",
  [process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID!]: "basic",
  [process.env.POLAR_MONTHLY_PRO_PRODUCT_ID!]: "pro",
  [process.env.POLAR_ANNUAL_PRO_PRODUCT_ID!]: "pro"
};

// Map Polar product IDs to billing period (for calculating end date)
const PRODUCT_TO_BILLING: Record<string, "monthly" | "annual"> = {
  [process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID!]: "monthly",
  [process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID!]: "annual",
  [process.env.POLAR_MONTHLY_PRO_PRODUCT_ID!]: "monthly",
  [process.env.POLAR_ANNUAL_PRO_PRODUCT_ID!]: "annual"
};

// Calculate subscription end date based on billing period
function calculateEndDate(billingPeriod: "monthly" | "annual"): Date {
  const now = new Date();
  if (billingPeriod === "annual") {
    return new Date(now.setFullYear(now.getFullYear() + 1));
  }
  return new Date(now.setMonth(now.getMonth() + 1));
}

// Simple in-memory idempotency tracking (use Redis in production)
const processedEvents = new Map<string, number>();
const IDEMPOTENCY_WINDOW = 5 * 60 * 1000; // 5 minutes

function isEventProcessed(eventId: string): boolean {
  const now = Date.now();

  // Clean up old entries
  for (const [id, timestamp] of processedEvents.entries()) {
    if (now - timestamp > IDEMPOTENCY_WINDOW) {
      processedEvents.delete(id);
    }
  }

  if (processedEvents.has(eventId)) {
    return true;
  }

  processedEvents.set(eventId, now);
  return false;
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("[Polar Webhook] Missing POLAR_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Get the raw body
  const payload = await req.text();

  let event;
  try {
    event = JSON.parse(payload);
  }
  catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.type;
  const eventId = event.id || `${eventType}-${event.data?.id}-${Date.now()}`;

  // Idempotency check - prevent processing the same event twice
  if (isEventProcessed(eventId)) {
    console.log(`[Polar Webhook] Skipping duplicate event: ${eventId}`);
    return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
  }

  try {
    switch (eventType) {
      // Checkout completed - user subscribed
      case "checkout.created":
      case "checkout.updated": {
        // Only process if checkout is confirmed/succeeded
        const status = event.data.status;
        if (status !== "succeeded" && status !== "confirmed") {
          return NextResponse.json({ received: true, skipped: "pending checkout" }, { status: 200 });
        }

        const clerkId = event.data.metadata?.clerkId;
        const productId = event.data.product_id || event.data.productId || event.data.product?.id;
        const customerId = event.data.customer_id || event.data.customerId || event.data.customer?.id;
        const subscriptionId = event.data.subscription_id || event.data.subscriptionId || event.data.subscription?.id;

        if (!clerkId) {
          console.error("[Polar Webhook] Missing clerkId in metadata");
          return NextResponse.json({ error: "Missing clerkId in metadata" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.query.users.findFirst({
          where: eq(users.clerkId, clerkId),
        });

        if (!existingUser) {
          console.error(`[Polar Webhook] User not found: ${clerkId}`);
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const tier = PRODUCT_TO_TIER[productId] || "basic";
        const billingPeriod = PRODUCT_TO_BILLING[productId] || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        // Idempotency: Check if this subscription is already active
        if (existingUser.polarSubscriptionId === subscriptionId && existingUser.isSubscribed) {
          console.log(`[Polar Webhook] Subscription already active for user ${clerkId}`);
          return NextResponse.json({ received: true, skipped: "already active" }, { status: 200 });
        }

        await db
          .update(users)
          .set({
            isSubscribed: true,
            subscriptionTier: tier,
            polarCustomerId: customerId || existingUser.polarCustomerId,
            polarSubscriptionId: subscriptionId || existingUser.polarSubscriptionId,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: endDate,
            updatedAt: new Date()
          })
          .where(eq(users.clerkId, clerkId));

        console.log(`[Polar Webhook] Activated subscription for ${clerkId} - tier: ${tier}`);
        break;
      }

      // Subscription activated
      case "subscription.created":
      case "subscription.active": {
        const customerId = event.data.customer_id || event.data.customerId || event.data.customer?.id;
        const productId = event.data.product_id || event.data.productId || event.data.product?.id;
        const subscriptionId = event.data.id;

        if (!customerId) {
          return NextResponse.json({ received: true, skipped: "no customer ID" }, { status: 200 });
        }

        const tier = PRODUCT_TO_TIER[productId] || "basic";
        const billingPeriod = PRODUCT_TO_BILLING[productId] || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        const result = await db
          .update(users)
          .set({
            isSubscribed: true,
            subscriptionTier: tier,
            polarSubscriptionId: subscriptionId,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: endDate,
            updatedAt: new Date()
          })
          .where(eq(users.polarCustomerId, customerId));

        console.log(`[Polar Webhook] Subscription activated for customer: ${customerId}`);
        break;
      }

      // Subscription canceled or expired
      case "subscription.canceled":
      case "subscription.revoked": {
        const customerId = event.data.customer_id || event.data.customerId || event.data.customer?.id;

        if (!customerId) {
          return NextResponse.json({ received: true, skipped: "no customer ID" }, { status: 200 });
        }

        await db
          .update(users)
          .set({
            isSubscribed: false,
            subscriptionTier: "free",
            subscriptionEndDate: new Date(),
            updatedAt: new Date()
          })
          .where(eq(users.polarCustomerId, customerId));

        console.log(`[Polar Webhook] Subscription canceled for customer: ${customerId}`);
        break;
      }

      // Subscription updated (plan change)
      case "subscription.updated": {
        const customerId = event.data.customer_id || event.data.customerId || event.data.customer?.id;
        const productId = event.data.product_id || event.data.productId || event.data.product?.id;

        if (!customerId) {
          return NextResponse.json({ received: true, skipped: "no customer ID" }, { status: 200 });
        }

        const tier = PRODUCT_TO_TIER[productId] || "basic";
        const billingPeriod = PRODUCT_TO_BILLING[productId] || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        await db
          .update(users)
          .set({
            subscriptionTier: tier,
            subscriptionEndDate: endDate,
            updatedAt: new Date()
          })
          .where(eq(users.polarCustomerId, customerId));

        console.log(`[Polar Webhook] Subscription updated for customer: ${customerId}, tier: ${tier}`);
        break;
      }

      default:
        // Don't fail on unknown events, just acknowledge
        console.log(`[Polar Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  }
  catch (error) {
    console.error("[Polar Webhook] Error processing webhook:", error);
    // Return 500 so Polar retries the webhook
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
