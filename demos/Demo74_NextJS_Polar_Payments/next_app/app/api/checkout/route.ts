import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import PLAN_TO_PRODUCT from "@/app/_utils/planToProductRecord";

// Setting up a Polar instance to work with payments
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox"
});

// Setting up checkout route depending on the user autentication
// Redirect URLs for product checkout based on request plan
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  if (!plan || !PLAN_TO_PRODUCT[plan]) {
    throw new Error("Invalid plan selected");
  }

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", `/api/checkout?plan=${plan}`);
    return NextResponse.redirect(signInUrl);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  if (!user) {
    throw new Error("User not found");
  }

  // If already has active subscription, they should use the change plan API
  if (user.polarSubscriptionId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Create a checkout session with Polar
  const checkout = await polar.checkouts.create({
    products: [PLAN_TO_PRODUCT[plan]!],
    customerEmail: user.email,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
    metadata: {
      clerkId: userId,
      plan: plan,
      internalUserId: user.id
    }
  });

  return NextResponse.redirect(checkout.url);
}
