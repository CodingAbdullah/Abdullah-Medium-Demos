import { CustomerPortal } from "@polar-sh/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async () => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Look up the Polar customer ID from our database
    const [user] = await db
      .select({ polarCustomerId: users.polarCustomerId })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (!user?.polarCustomerId) {
      throw new Error("Customer not found");
    }

    return user.polarCustomerId;
  },
  server: "sandbox", // Change to "production" when ready
});
