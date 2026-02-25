import { createHmac, timingSafeEqual } from "crypto";

const POLAR_API_KEY = process.env.POLAR_API_KEY!;
const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID!;
const POLAR_WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface PolarCheckoutResult {
  checkoutId: string;
  checkoutUrl: string;
}

export async function createCheckoutSession(
  paymentId: string
): Promise<PolarCheckoutResult> {
  const response = await fetch("https://api.polar.sh/v1/checkouts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${POLAR_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: POLAR_PRODUCT_ID,
      success_url: `${APP_URL}/api/protected-resource`,
      metadata: { payment_id: paymentId },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Polar checkout creation failed: ${error}`);
  }

  const data = await response.json();

  return {
    checkoutId: data.id as string,
    checkoutUrl: data.url as string,
  };
}

export async function verifyWebhook(request: Request): Promise<{
  paymentId: string;
  checkoutId: string;
  status: string;
}> {
  const rawBody = await request.text();
  const signature = request.headers.get("webhook-signature") ?? "";

  const parts = signature.split(",").reduce(
    (acc: Record<string, string>, part) => {
      const [key, value] = part.split("=");
      acc[key] = value;
      return acc;
    },
    {}
  );

  const timestamp = parts["t"];
  const receivedSig = parts["v1"];

  if (!timestamp || !receivedSig) {
    throw new Error("Missing webhook signature components");
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedSig = createHmac("sha256", POLAR_WEBHOOK_SECRET)
    .update(signedPayload)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSig, "hex");
  const receivedBuffer = Buffer.from(receivedSig, "hex");

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    throw new Error("Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody);
  const eventType: string = payload.type;

  if (eventType !== "checkout.updated" && eventType !== "order.created") {
    throw new Error(`Unhandled event type: ${eventType}`);
  }

  const checkoutData =
    payload.data?.checkout ?? payload.data;
  const paymentId: string =
    checkoutData?.metadata?.payment_id ?? checkoutData?.metadata?.payment_id;
  const checkoutId: string = checkoutData?.id;
  const status: string = checkoutData?.status ?? "succeeded";

  if (!paymentId) {
    throw new Error("payment_id not found in webhook metadata");
  }

  return { paymentId, checkoutId, status };
}
