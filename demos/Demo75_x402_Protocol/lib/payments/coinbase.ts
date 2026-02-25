import { createHmac, timingSafeEqual } from "crypto";

const COINBASE_API_KEY = process.env.COINBASE_COMMERCE_API_KEY!;
const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface CoinbaseChargeResult {
  chargeId: string;
  hostedUrl: string;
}

export async function createCharge(
  paymentId: string
): Promise<CoinbaseChargeResult> {
  const response = await fetch("https://api.commerce.coinbase.com/charges", {
    method: "POST",
    headers: {
      "X-CC-Api-Key": COINBASE_API_KEY,
      "X-CC-Version": "2018-03-22",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Protected Resource Access",
      description: "Payment to access protected resource via x402 protocol",
      pricing_type: "fixed_price",
      local_price: {
        amount: "1.00",
        currency: "USD",
      },
      metadata: {
        payment_id: paymentId,
      },
      redirect_url: `${APP_URL}/api/protected-resource`,
      cancel_url: `${APP_URL}/`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Coinbase charge creation failed: ${error}`);
  }

  const data = await response.json();

  return {
    chargeId: data.data.id as string,
    hostedUrl: data.data.hosted_url as string,
  };
}

export async function verifyWebhook(request: Request): Promise<{
  paymentId: string;
  chargeId: string;
  status: string;
}> {
  const rawBody = await request.text();
  const signature = request.headers.get("x-cc-webhook-signature") ?? "";

  const expectedSig = createHmac("sha256", COINBASE_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSig, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    throw new Error("Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody);
  const eventType: string = payload.event?.type;

  if (eventType !== "charge:confirmed" && eventType !== "charge:resolved") {
    throw new Error(`Unhandled event type: ${eventType}`);
  }

  const chargeData = payload.event?.data;
  const paymentId: string = chargeData?.metadata?.payment_id;
  const chargeId: string = chargeData?.id;
  const status: string = chargeData?.timeline?.at(-1)?.status ?? "COMPLETED";

  if (!paymentId) {
    throw new Error("payment_id not found in charge metadata");
  }

  return { paymentId, chargeId, status };
}
