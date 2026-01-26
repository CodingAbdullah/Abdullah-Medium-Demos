// Map Polar product IDs to billing period (for calculating end date)
const PRODUCT_TO_BILLING: Record<string, "monthly" | "annual"> = {
    [process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID!]: "monthly",
    [process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID!]: "annual",
    [process.env.POLAR_MONTHLY_PRO_PRODUCT_ID!]: "monthly",
    [process.env.POLAR_ANNUAL_PRO_PRODUCT_ID!]: "annual"
};

export default PRODUCT_TO_BILLING;
  