import { z } from 'zod';

// Define the AI Generated Schema using Zod
const AITextGeneratedSchema = z.object({
    summary: z.string(),
    btcAnalysis: z.string(),
    ethAnalysis: z.string(),
    marketOverview: z.string(),
    trendingCoinsAnalysis: z.string(),
    topGainersAnalysis: z.string(),
    conclusion: z.string()
});

export default AITextGeneratedSchema;