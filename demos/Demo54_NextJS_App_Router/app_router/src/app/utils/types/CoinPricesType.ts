// Coin Prices Data Type
export default interface CoinPricesType {
    id: string
    name: string,
    symbol: string,
    image: string,
    current_price: string,
    high_24h: string,
    low_24h: string,
    market_cap: number,
    total_volume: number,
    price_change_percentage_24h: number
}