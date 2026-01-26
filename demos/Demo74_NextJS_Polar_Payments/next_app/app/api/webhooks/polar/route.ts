import { NextRequest, NextResponse } from "next/server";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import calculateEndDate from "@/app/_utils/createDateFunction";
import PRODUCT_TO_BILLING from "@/app/_utils/productToBillingRecord";
import PRODUCT_TO_TIER from "@/app/_utils/productToTierRecord";

// Process Polar payment webhooks
// Update the database once the payment process is complete with the latest subscription status information
export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Get the raw body
  const payload = await req.text();

  // Verify webhook signature using Polar SDK
  let event;
  try {
    event = validateEvent(payload, Object.fromEntries(req.headers), WEBHOOK_SECRET);
  } 
  catch (error) {
    if (error instanceof WebhookVerificationError) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  const eventType = event.type;

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

        const clerkId = event.data.metadata?.clerkId as string | undefined;
        const productId = event.data.productId;
        const customerId = event.data.customerId;
        const subscriptionId = event.data.subscriptionId;

        if (!clerkId) {
          return NextResponse.json({ error: "Missing clerkId in metadata" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.query.users.findFirst({
          where: eq(users.clerkId, clerkId)
        });

        if (!existingUser) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const tier = (productId && PRODUCT_TO_TIER[productId]) || "basic";
        const billingPeriod = (productId && PRODUCT_TO_BILLING[productId]) || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        // Idempotency: Check if this subscription is already active
        if (existingUser.polarSubscriptionId === subscriptionId && existingUser.isSubscribed) {
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

        break;
      }

      // Subscription activated
      case "subscription.created":
      case "subscription.active": {
        const customerId = event.data.customerId;
        const productId = event.data.productId;
        const subscriptionId = event.data.id;
        const clerkId = event.data.metadata?.clerkId as string | undefined;

        // Try to find user by clerkId first (new subscription), fallback to customerId (existing customer)
        if (!clerkId && !customerId) {
          return NextResponse.json({ received: true, skipped: "no identifier" }, { status: 200 });
        }

        const tier = (productId && PRODUCT_TO_TIER[productId]) || "basic";
        const billingPeriod = (productId && PRODUCT_TO_BILLING[productId]) || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        if (clerkId) {
          await db
            .update(users)
            .set({
              isSubscribed: true,
              subscriptionTier: tier,
              polarCustomerId: customerId,
              polarSubscriptionId: subscriptionId,
              subscriptionStartDate: new Date(),
              subscriptionEndDate: endDate,
              updatedAt: new Date()
            })
            .where(eq(users.clerkId, clerkId));
        } else {
          await db
            .update(users)
            .set({
              isSubscribed: true,
              subscriptionTier: tier,
              polarSubscriptionId: subscriptionId,
              subscriptionStartDate: new Date(),
              subscriptionEndDate: endDate,
              updatedAt: new Date()
            })
            .where(eq(users.polarCustomerId, customerId!));
        }

        break;
      }

      // Subscription canceled or expired
      case "subscription.canceled":
      case "subscription.revoked": {
        const customerId = event.data.customerId;

        if (!customerId) {
          return NextResponse.json({ received: true, skipped: "no customer ID" }, { status: 200 });
        }

        await db
          .update(users)
          .set({
            isSubscribed: false,
            subscriptionTier: "free",
            polarSubscriptionId: null,
            subscriptionEndDate: new Date(),
            updatedAt: new Date()
          })
          .where(eq(users.polarCustomerId, customerId));

        break;
      }

      // Subscription updated (plan change)
      case "subscription.updated": {
        const customerId = event.data.customerId;
        const productId = event.data.productId;

        if (!customerId) {
          return NextResponse.json({ received: true, skipped: "no customer ID" }, { status: 200 });
        }

        const tier = (productId && PRODUCT_TO_TIER[productId]) || "basic";
        const billingPeriod = (productId && PRODUCT_TO_BILLING[productId]) || "monthly";
        const endDate = calculateEndDate(billingPeriod);

        await db
          .update(users)
          .set({
            subscriptionTier: tier,
            subscriptionEndDate: endDate,
            updatedAt: new Date()
          })
          .where(eq(users.polarCustomerId, customerId));

        break;
      }

      default:
        // Don't fail on unknown events, just acknowledge
        console.log(`[Polar Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  }
  catch {
    // Return 500 so Polar retries the webhook
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
