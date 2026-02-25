import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createCharge } from "@/lib/payments/coinbase";

export async function POST(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("payment_id");

  if (!paymentId) {
    return NextResponse.json(
      { error: { code: "missing_payment_id", message: "payment_id is required" } },
      { status: 400 }
    );
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
    return NextResponse.json(
      { error: { code: "already_paid", message: "Payment already completed" } },
      { status: 409 }
    );
  }

  const { chargeId, hostedUrl } = await createCharge(paymentId);

  await db
    .update(payments)
    .set({
      provider: "coinbase",
      external_id: chargeId,
      currency: "USDC",
      updated_at: new Date(),
    })
    .where(eq(payments.id, paymentId));

  return NextResponse.json(
    {
      payment_id: paymentId,
      provider: "coinbase",
      hosted_url: hostedUrl,
    },
    { status: 200 }
  );
}
