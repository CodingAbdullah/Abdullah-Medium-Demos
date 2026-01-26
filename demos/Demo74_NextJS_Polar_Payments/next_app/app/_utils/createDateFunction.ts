// Calculate subscription end date based on billing period
export default function calculateEndDate(billingPeriod: "monthly" | "annual"): Date {
    const now = new Date();
    if (billingPeriod === "annual") {
        return new Date(now.setFullYear(now.getFullYear() + 1));
    }
    return new Date(now.setMonth(now.getMonth() + 1));
}