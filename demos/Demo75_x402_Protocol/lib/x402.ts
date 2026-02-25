import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { payments } from "./schema";
import { eq } from "drizzle-orm";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function generatePaymentId(): string {
  return uuidv4();
}

export function create402Response(paymentId: string): Response {
  const body = {
    error: {
      code: "payment_required",
      message: "Payment required to access this resource",
    },
    payment: {
      version: "x402-1.0",
      payment_id: paymentId,
      resource: "/api/protected-resource",
      options: [
        {
          provider: "polar",
          method: "fiat",
          currency: "USD",
          checkout_url: `${APP_URL}/api/payments/fiat/checkout?payment_id=${paymentId}`,
        },
        {
          provider: "coinbase",
          method: "crypto",
          currency: "USDC",
          network: "base",
          checkout_url: `${APP_URL}/api/payments/crypto/checkout?payment_id=${paymentId}`,
        },
      ],
      retry: {
        endpoint: "/api/protected-resource",
        method: "GET",
        headers: {
          "x-payment-id": paymentId,
        },
      },
    },
  };

  return new Response(JSON.stringify(body), {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "x-payment-required": "true",
      "x-payment-version": "x402-1.0",
      "x-payment-id": paymentId,
    },
  });
}

export async function validatePayment(paymentId: string): Promise<boolean> {
  const result = await db
    .select()
    .from(payments)
    .where(eq(payments.id, paymentId))
    .limit(1);

  if (result.length === 0) return false;
  return result[0].status === "paid";
}
