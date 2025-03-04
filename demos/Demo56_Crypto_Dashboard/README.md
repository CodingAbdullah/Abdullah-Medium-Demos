# Ethereum Dashboard

### Live Ethereum Wallet Dashboard for Blockchain Analytics
Explore your Ethereum wallet with an all-in-one dashboard built using **Next.js** and hosted cost-free on **Vercel**. 

[Ethereum Dashboard](https://ethereumdashboard.dev)

---

## 🚀 Features

### Wallet & Asset Analytics
- **ERC20/721 Holdings:** View all tokens and NFTs in your wallet.  
- **ERC20/721 Collection Analytics:** Detailed insights on token and NFT collections.  
- **Transactions:** Analyze your complete transaction history.  
- **Wallet Analytics:** Get in-depth metrics on wallet performance.  

### Market Data & Pricing
- **Coin Prices & ERC20 Prices:** Live data for cryptocurrency and token prices.  
- **Global Market Data:** Keep track of the market cap, volume, and trends globally.  
- **Trending Coins/Collections:** Discover hot projects and market movers.  
- **Top Coins/Collections:** Track leading cryptocurrencies and NFT collections.  
- **Live Pricing Data:** Enjoy real-time pricing for tokens and NFTs.  

### Layer Two Support
- **Layer Two Dashboards:** Get insights for Polygon, Arbitrum, and Optimism.  

### Ethereum Tools
- **ENS Integration:** Resolve wallet addresses to ENS names.  
- **Ethereum Gas Tracker:** Monitor gas prices in real time.  
- **Market Insights:** Gather detailed information about the latest market conditions.
- **Staking/Validators:** Lookup information related to Ethereum validators and staking.
- **ERC20/721 Lookups:** Quickly find data on tokens and NFTs.  
- **EIP Info:** Learn about Ethereum Improvement Proposals directly from the dashboard.  

---

## 🔌 APIs and Integrations

### Core APIs
- **Alchemy:** Blockchain data provider for wallet balances, transaction history, and token details.  
- **CoinGecko:** Fetch live market data, trending coins, and pricing details.  
- **Transpose:** Advanced analytics and wallet history queries.  
- **Moralis:** Multi-chain support for NFTs and tokens.  

### Marketplace APIs
- **Opensea:** Insights into trending NFT collections, metadata, and floor prices.  

### Utility APIs
- **Beaconchain** Insights into Ethereum staking and validators.
- **BlockNative:** Real-time Ethereum gas price monitoring.  
- **Etherscan:** Transaction details and blockchain explorer integration.  

---

## 🛠️ Built With

- **Next.js:** Next-generation React.js framework for seamless server-side rendering and static site generation.  
- **Shadcn/UI:** Component library for rapid development.
- **Lucide-React/Font-Awesome:** Icon Libraries for rapid development.
- **V0.dev:** AI-powered application for rapidly prototyping and building Next.js applications.
- **Vercel AI SDK:** NPM package used for powering AI-generated market insights.
- **Tailwind CSS:** For modern, responsive UI designs.
- **Node.js:** Backend integrations with APIs.
- **Vercel Hosting:** Application is deployed cost-free using Vercel.

---

## 🌐 Deployment

- **Domain:** [Ethereum Dashboard](https://ethereumdashboard.dev)  
- **Hosting:** Deployed cost-free on **Vercel**, leveraging its robust serverless capabilities.  

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** and **npm** installed.  
- API keys for Alchemy, BeaconChain, CoinGecko, Transpose, Moralis, Opensea, BlockNative, and Etherscan.  

### Installation
1. Clone the repository and run <code>npm install</code> to add in the necessary dependencies:  
   ```bash  
   git clone https://github.com/CodingAbdullah/Ethereum-Wallet-Dashboard.git 
   npm install

2. Add in your <b>API secrets</b> in a <code>.env</code> file located in the root of the project:  
   ```bash  
    ETHERSCAN_API_KEY=''
    MORALIS_API_KEY=''
    BLK_API_KEY=''
    BEACON_CHAIN_API_KEY=''
    ALCHEMY_API_KEY=''
    COINGECKO_API_KEY=''
    GROQ_API_KEY=''
    OPENSEA_API_KEY=''
    TRANSPOSE_API_KEY=''
    PORT=''

3. Run the local development environment:
    ```bash
    npm run dev