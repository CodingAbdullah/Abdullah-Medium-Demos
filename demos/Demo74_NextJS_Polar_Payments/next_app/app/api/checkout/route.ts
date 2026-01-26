import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox"
});

const PLAN_TO_PRODUCT: Record<string, string | undefined> = {
  "basic-monthly": process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID,
  "basic-annual": process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID,
  "pro-monthly": process.env.POLAR_MONTHLY_PRO_PRODUCT_ID,
  "pro-annual": process.env.POLAR_ANNUAL_PRO_PRODUCT_ID
};

// Map plan to tier for comparison
const PLAN_TO_TIER: Record<string, string> = {
  "basic-monthly": "basic",
  "basic-annual": "basic",
  "pro-monthly": "pro",
  "pro-annual": "pro"
};

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  // Validate plan parameter
  if (!plan || !PLAN_TO_PRODUCT[plan]) {
    return NextResponse.redirect(new URL("/checkout/error?error=invalid-plan", req.url));
  }

  // If user is not signed in, redirect to sign-in with return URL
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", `/api/checkout?plan=${plan}`);
    return NextResponse.redirect(signInUrl);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  if (!user) {
    return NextResponse.redirect(new URL("/checkout/error?error=user-not-found", req.url));
  }

  // Check if user already has an active subscription to the same or higher tier
  const requestedTier = PLAN_TO_TIER[plan];
  if (user.isSubscribed) {
    const tierHierarchy = { free: 0, basic: 1, pro: 2 };
    const currentTierLevel = tierHierarchy[user.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requestedTierLevel = tierHierarchy[requestedTier as keyof typeof tierHierarchy] || 0;

    if (requestedTierLevel <= currentTierLevel) {
      // User already has this tier or higher, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard?notice=already-subscribed", req.url));
    }
  }

  const productId = PLAN_TO_PRODUCT[plan]!;

  try {
    // Create Polar checkout session
    const checkout = await polar.checkouts.create({
      products: [productId],
      customerEmail: user.email,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
      metadata: {
        clerkId: userId,
        plan: plan,
        internalUserId: user.id
      }
    });

    // Redirect to Polar checkout
    return NextResponse.redirect(checkout.url);
  }
  catch (error) {
    console.error("[Checkout] Polar API error:", error);
    return NextResponse.redirect(new URL("/checkout/error?error=checkout-failed", req.url));
  }
}
