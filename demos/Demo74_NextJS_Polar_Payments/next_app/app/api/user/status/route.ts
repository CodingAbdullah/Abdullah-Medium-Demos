import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Get user subscription status
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ isSubscribed: false });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  return NextResponse.json({
    isSubscribed: user?.isSubscribed ?? false,
    subscriptionTier: user?.subscriptionTier ?? "free",
    hasActiveSubscription: !!user?.polarSubscriptionId
  });
}
