import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import PLAN_TO_PRODUCT from "@/app/_utils/planToProductRecord";

// Setting up the Polar instance for processing payments
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox"
});

// API route to change the user's subscription plan
export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { plan } = await req.json();

  if (!plan || !PLAN_TO_PRODUCT[plan]) {
    throw new Error("Invalid plan");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  if (!user || !user.polarSubscriptionId) {
    throw new Error("No active subscription found");
  }

  // Update method for changing the subscription plan
  try {
    await polar.subscriptions.update({
      id: user.polarSubscriptionId,
      subscriptionUpdate: { productId: PLAN_TO_PRODUCT[plan]! }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Subscription Change] Error:", error);

    // If subscription is already cancelled, clear it and tell frontend to use checkout
    if (String(error).includes("AlreadyCanceledSubscription")) {
      await db
        .update(users)
        .set({
          polarSubscriptionId: null,
          isSubscribed: false,
          subscriptionTier: "free",
          updatedAt: new Date()
        })
        .where(eq(users.clerkId, userId));

      return NextResponse.json({ error: "cancelled", useCheckout: true }, { status: 400 });
    }

    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
