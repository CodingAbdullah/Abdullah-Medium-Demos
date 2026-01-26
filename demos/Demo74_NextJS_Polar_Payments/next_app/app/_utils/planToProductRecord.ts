// Plan to Product Record mapping plan identifiers to product IDs from environment variables
const PLAN_TO_PRODUCT: Record<string, string | undefined> = {
    "basic-monthly": process.env.POLAR_MONTHLY_BASIC_PRODUCT_ID,
    "basic-annual": process.env.POLAR_ANNUAL_BASIC_PRODUCT_ID,
    "pro-monthly": process.env.POLAR_MONTHLY_PRO_PRODUCT_ID,
    "pro-annual": process.env.POLAR_ANNUAL_PRO_PRODUCT_ID
};

export default PLAN_TO_PRODUCT;