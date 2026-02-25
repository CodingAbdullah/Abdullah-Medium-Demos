import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse | Response> {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/protected-resource") {
    const paymentId = request.headers.get("x-payment-id");

    if (!paymentId) {
      const newPaymentId = crypto.randomUUID();

      const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const body = {
        error: {
          code: "payment_required",
          message: "Payment required to access this resource",
        },
        payment: {
          version: "x402-1.0",
          payment_id: newPaymentId,
          resource: "/api/protected-resource",
          options: [
            {
              provider: "polar",
              method: "fiat",
              currency: "USD",
              checkout_url: `${APP_URL}/api/payments/fiat/checkout?payment_id=${newPaymentId}`,
            },
            {
              provider: "coinbase",
              method: "crypto",
              currency: "USDC",
              network: "base",
              checkout_url: `${APP_URL}/api/payments/crypto/checkout?payment_id=${newPaymentId}`,
            },
          ],
          retry: {
            endpoint: "/api/protected-resource",
            method: "GET",
            headers: {
              "x-payment-id": newPaymentId,
            },
          },
        },
      };

      return new NextResponse(JSON.stringify(body), {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          "x-payment-required": "true",
          "x-payment-version": "x402-1.0",
          "x-payment-id": newPaymentId,
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected-resource"],
};
