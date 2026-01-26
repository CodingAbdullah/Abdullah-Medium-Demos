// Map Polar product IDs to subscription tiers
const PRODUCT_TO_TIER: Record<string, "free" | "basic" | "pro"> = {
    [process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID!]: "basic",
    [process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID!]: "basic",
    [process.env.POLAR_MONTHLY_PRO_PRODUCT_ID!]: "pro",
    [process.env.POLAR_ANNUAL_PRO_PRODUCT_ID!]: "pro"
};

export default PRODUCT_TO_TIER;