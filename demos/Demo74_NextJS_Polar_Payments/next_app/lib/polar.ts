import { Polar } from "@polar-sh/sdk";

// Change to "production" when ready
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox"
});

// Subscription tier types
export type SubscriptionTier = "free" | "pro" | "enterprise";
export type BillingInterval = "monthly" | "annually";

// Product IDs from Polar (from environment variables)
export const PRODUCT_IDS = {
  free: process.env.POLAR_FREE_PRODUCT_ID!,
  pro: {
    monthly: process.env.POLAR_MONTHLY_PRO_PRODUCT_ID!,
    annually: process.env.POLAR_ANNUAL_PRO_PRODUCT_ID!
  },
  enterprise: {
    monthly: process.env.POLAR_MONTHLY_ENTERPRISE_PRODUCT_ID!,
    annually: process.env.POLAR_ANNUAL_ENTERPRISE_PRODUCT_ID!
  }
} as const;

// Tier information with pricing
export const TIER_INFO: Record<SubscriptionTier, {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  annualDiscount: number;
  features: string[];
}> = {
  free: {
    name: "Free",
    description: "Get started with basic features",
    monthlyPrice: 0,
    annualPrice: 0,
    annualDiscount: 0,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage"
    ]
  },
  pro: {
    name: "Pro",
    description: "Perfect for growing teams",
    monthlyPrice: 19,
    annualPrice: 190, // ~17% discount
    annualDiscount: 17,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom integrations",
      "Team collaboration"
    ]
  },
  enterprise: {
    name: "Enterprise",
    description: "For large-scale operations",
    monthlyPrice: 49,
    annualPrice: 470, // ~20% discount
    annualDiscount: 20,
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 dedicated support",
      "Custom SLA",
      "SSO & SAML",
      "Advanced security",
      "API access",
      "Custom contracts"
    ]
  }
};

// Get product ID based on tier and billing interval
export function getProductId(tier: SubscriptionTier, interval: BillingInterval): string {
  if (tier === "free") {
    return PRODUCT_IDS.free;
  }
  return PRODUCT_IDS[tier][interval];
}

// Legacy mapping for backward compatibility (maps to monthly by default)
export const TIER_PRODUCT_MAP: Record<SubscriptionTier, string> = {
  free: PRODUCT_IDS.free,
  pro: PRODUCT_IDS.pro.monthly,
  enterprise: PRODUCT_IDS.enterprise.monthly
};