// Wallet Stats Info Type
export default interface WalletStatsInfoType {
    nfts: string,
    collections: string,
    transactions: {
        total: string
    },
    nft_transfers: {
        total: string
    },
    token_transfers: {
        total: string
    }
}