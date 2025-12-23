import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set in environment variables')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  }
  catch (err) {
    return new Response('Error: Verification failed', {
      status: 400
    })
  }

  // Handle the webhook event
  const eventType = evt.type

  // Handle different event types
  try {
    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, primary_email_address_id, first_name, last_name } = evt.data

        // Get primary email address
        const primaryEmail = email_addresses.find(
          (e) => e.id === primary_email_address_id
        )?.email_address || email_addresses[0]?.email_address || ''

        // Save user to database
        await db.insert(users).values({
          clerkUserId: id,
          email: primaryEmail,
          firstName: first_name || null,
          lastName: last_name || null
        })

        break
      }

      case 'user.updated': {
        const { id, email_addresses, primary_email_address_id, first_name, last_name } = evt.data

        // Get primary email address
        const primaryEmail = email_addresses.find(
          (e) => e.id === primary_email_address_id
        )?.email_address || email_addresses[0]?.email_address || ''

        // Update user in database
        await db
          .update(users)
          .set({
            email: primaryEmail,
            firstName: first_name || null,
            lastName: last_name || null,
            updatedAt: new Date()
          })
          .where(eq(users.clerkUserId, id))

        break
      }

      case 'user.deleted': {
        const { id } = evt.data

        if (!id) break

        // Delete user from database
        await db.delete(users).where(eq(users.clerkUserId, id))

        break
      }

      case 'session.created':
        break

      case 'session.ended':
        break

      default:
        break
    }
  }
  catch (error) {
    return new Response('Error processing webhook', { status: 500 })
  }

  return new Response('Webhook processed successfully', { status: 200 })
}
