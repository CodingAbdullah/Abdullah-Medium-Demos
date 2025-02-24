import { z } from 'zod';

// Define the market schema using Zod
const marketSchema = z.object({
    bitcoin_information: z.object({
        coin_price: z.string(),
        coin_price_change_1h: z.string(),
        coin_price_change_24h: z.string(),
        coin_price_change_7d: z.string(),
        coin_volume_24h: z.string(),
        coin_market_cap: z.string()
    }),
    ethereum_information: z.object({
        coin_price: z.string(),
        coin_price_change_1h: z.string(),
        coin_price_change_24h: z.string(),
        coin_price_change_7d: z.string(),
        coin_volume_24h: z.string(),
        coin_market_cap: z.string()
    }),
    dominance_ratio: z.string(),
    market_cap: z.string(),
    market_cap_price_change: z.string(),
    market_cap_volume: z.string(),
    trending_coins: z.array(z.string())
});

export default marketSchema;