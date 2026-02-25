import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  generatePaymentId,
  create402Response,
  validatePayment,
} from "@/lib/x402";

export async function GET(request: NextRequest): Promise<Response> {
  const paymentId = request.headers.get("x-payment-id");

  if (paymentId) {
    const isPaid = await validatePayment(paymentId);

    if (isPaid) {
      return NextResponse.json(
        {
          success: true,
          message: "Access granted to protected resource",
          data: {
            resource: "protected-content",
            accessed_at: new Date().toISOString(),
            payment_id: paymentId,
          },
        },
        { status: 200 }
      );
    }

    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.id, paymentId))
      .limit(1);

    if (result.length > 0 && result[0].status === "pending") {
      return create402Response(paymentId);
    }
  }

  const newPaymentId = generatePaymentId();

  await db.insert(payments).values({
    id: newPaymentId,
    user_id: "anonymous",
    status: "pending",
  });

  return create402Response(newPaymentId);
}
