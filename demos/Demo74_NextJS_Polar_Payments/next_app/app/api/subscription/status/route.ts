import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized", isSubscribed: false, subscriptionTier: "free" },
      { status: 401 }
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found", isSubscribed: false, subscriptionTier: "free" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    isSubscribed: user.isSubscribed,
    subscriptionTier: user.subscriptionTier,
    subscriptionEndDate: user.subscriptionEndDate,
    polarCustomerId: user.polarCustomerId
  });
}
