import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Setting up the Polar instance for processing payments
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox"
});

// API route to cancel the user's subscription
export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  if (!user || !user.polarSubscriptionId) {
    return NextResponse.json({ error: "No active subscription", alreadyCancelled: true }, { status: 400 });
  }

  // Update method for cancelling the subscription plan
  try {
    await polar.subscriptions.update({
      id: user.polarSubscriptionId,
      subscriptionUpdate: { cancelAtPeriodEnd: true }
    });
    return NextResponse.json({ success: true, pendingCancellation: true });
  } catch (error) {
    console.error("[Subscription Cancel] Error:", error);

    // Already set to cancel - treat as success
    if (String(error).includes("AlreadyCanceledSubscription")) {
      return NextResponse.json({ success: true, pendingCancellation: true });
    }

    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
