import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyWebhook } from "@/lib/payments/coinbase";

export async function POST(request: NextRequest): Promise<Response> {
  let paymentId: string;
  let chargeId: string;
  let status: string;

  try {
    const result = await verifyWebhook(request);
    paymentId = result.paymentId;
    chargeId = result.chargeId;
    status = result.status;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    return NextResponse.json(
      { error: { code: "webhook_verification_failed", message } },
      { status: 400 }
    );
  }

  if (status !== "COMPLETED" && status !== "RESOLVED") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const existing = await db
    .select()
    .from(payments)
    .where(eq(payments.id, paymentId))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json(
      { error: { code: "payment_not_found", message: "Payment record not found" } },
      { status: 404 }
    );
  }

  if (existing[0].status === "paid") {
    return NextResponse.json({ received: true, idempotent: true }, { status: 200 });
  }

  await db
    .update(payments)
    .set({
      status: "paid",
      external_id: chargeId,
      provider: "coinbase",
      updated_at: new Date(),
    })
    .where(eq(payments.id, paymentId));

  return NextResponse.json({ received: true }, { status: 200 });
}
