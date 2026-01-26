import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";

// Back-end route to handle Clerk webhooks
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent;
  }
  catch (err) {
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const primaryEmail = email_addresses.find(
          (e) => e.id === evt.data.primary_email_address_id
        );

        if (!primaryEmail) {
          return new Response("No primary email", { status: 400 });
        }

        // Use upsert to handle potential duplicate webhooks (idempotency)
        await db
          .insert(users)
          .values({
            clerkId: id,
            email: primaryEmail.email_address,
            firstName: first_name,
            lastName: last_name,
            isSubscribed: false,
            subscriptionTier: "free"
          })
          .onConflictDoNothing({ target: users.clerkId });

        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const primaryEmail = email_addresses.find(
          (e) => e.id === evt.data.primary_email_address_id
        );

        if (!primaryEmail) {
          return new Response("No primary email", { status: 400 });
        }

        await db
          .update(users)
          .set({
            email: primaryEmail.email_address,
            firstName: first_name,
            lastName: last_name,
            updatedAt: new Date()
          })
          .where(eq(users.clerkId, id));

        break;
      }

      case "user.deleted": {
        const { id } = evt.data;

        if (!id) {
          return new Response("Missing user id", { status: 400 });
        }

        await db.delete(users).where(eq(users.clerkId, id));

        break;
      }
    }

    return new Response("Webhook processed", { status: 200 });
  } 
  catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
