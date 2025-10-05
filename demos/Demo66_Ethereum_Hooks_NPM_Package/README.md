# ethereum-hooks
Useful package that contains custom React hooks that can be used for rapid development while working with the Ethereum blockchain. 

These hooks make use of various crypto APIs (free versions only) and save developer time by taking away the need for manual configuration and setup. 

The following resources were utilized when building these client hooks:

- <a href="https://docs.alchemy.com/reference/api-overview">Alchemy</a>
- <a href="https://docs.blocknative.com/">Blocknative</a>
- <a href="https://docs.coingecko.com/v3.0.1/reference/introduction">CoinGecko</a>
- <a href="https://docs.moralis.com/">Moralis</a>
- <a href="https://docs.opensea.io/reference/api-overview">Opensea</a>
- <a href="https://docs.transpose.io/">Transpose</a>

<br />

## React Hooks
This package uses AWS Lambda functions to construct authenticated API calls. The architecture follows a simple flow: **Client Hook → useFetch → AWS Lambda → Response**. 

The AWS Lambda functions handle authentication automatically using pre-configured API keys for various blockchain services:
- **OPENSEA_API_KEY** - For NFT marketplace data
- **MORALIS_API_KEY** - For Web3 data aggregation
- **BLK_API_KEY** - For Blocknative gas and mempool data
- **TRANSPOSE_API_KEY** - For indexed blockchain data
- **ALCHEMY_API_KEY** - For Ethereum node access and enhanced APIs

No backend setup or environment variables are required on your end.

## React Client Hooks

The hooks cover several areas of the Ethereum blockchain and can be used for Layer Two chains as well.

Each hook automatically connects to its dedicated AWS Lambda endpoint - no manual URL configuration is needed.

### Import Structure (v2.0.2+)

Starting with version 2.0.2, hooks are organized into grouped imports for better organization:

```javascript
// ENS Hooks
import { useAddressENSLookup, useENSNameLookup, useENSAddressLookup, useENSIDLookup } from 'ethereum-hooks/ens';

// ERC20 Token Hooks
import { useERC20Holdings, useERC20Transfers, useERC20CollectionOwners } from 'ethereum-hooks/erc20';

// ERC721 Token Hooks
import { useERC721CollectionData, useERC721Holdings, useERC721LookupData } from 'ethereum-hooks/erc721';

// Gas Hooks
import { useGasLookup } from 'ethereum-hooks/gas';

// Price Hooks
import { useETHPrice, useERC20Price, useERC721Price, useLayerTwoPrice } from 'ethereum-hooks/prices';
```

This structured approach makes it easier to:
- Import only what you need
- Understand which category each hook belongs to
- Maintain cleaner import statements

Here is a quick example of how you can work with client hooks. The following is a code snippet for working with React.js:

<code>ENSToAddressPage.tsx</code>
```javascript
import React, { FC }  from 'react';
import { useENSAddressLookup } from 'ethereum-hooks/ens';

// Incorporating the ENS to Address Client Hook.. using Vitalik Buterin's address
// No server setup required - connects directly to AWS Lambda

const ENSToAddressPage: FC = () => {
    // Hook automatically connects to AWS Lambda - no server setup required
    const addressInformation = useENSAddressLookup('vitalik.eth');
    
    // Each client hook uses the useFetch custom hook
    // It returns three states: data, error, loading
    // We capture these states in a variable (like above) and conditionally render the component
    if (addressInformation.loading){
        return <div>Loading..</div>
    }
    else if (addressInformation.error){
        return <div>Error loading data...</div>
    }
    else { 
        // Hardcoded some parts for demonstrative purposes only
        return (
            <div className='home-page'>
                <table>
                    <tr>
                        <th>ENS</th>
                        <th>Address</th>
                    </tr>
                    <tr>
                        <td>vitalik.eth</td>
                        <td>{ addressInformation.data?.information }</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ENSToAddressPage;
```

<br />

A list of chains supported is provided below in the <code>Types</code> section. 

## AWS Lambda Endpoints

The following table shows the **30 different client hooks** and their corresponding **AWS Lambda endpoints**:

<table>
    <tr>
        <th>Category</th>
        <th>Client Hook Name</th>
        <th>AWS Lambda Endpoint</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>ENS</td>
        <td><code>useAddressENSLookup(address: string)</code></td>
        <td><code>https://37zq2u4ntbygkw7inki3djjm440xctyd.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch the equivalent ENS name from a given address</td>
    </tr>
    <tr>
        <td>ENS</td>
        <td><code>useENSAddressLookup(ensName: string)</code></td>
        <td><code>https://jy3upsy3rgbengcktqlqfcwyhy0wcamb.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch the equivalent ETH address from a given ENS name</td>
    </tr>
    <tr>
        <td>ENS</td>
        <td><code>useENSIDLookup(id: string)</code></td>
        <td><code>https://ev6i3gsesgdvj7ouxiwpg4qafu0nfvdw.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch information of a given ENS ID</td>
    </tr>
    <tr>
        <td>ENS</td>
        <td><code>useENSNameLookup(ensName: string)</code></td>
        <td><code>https://f53actwgpl2a3rk6uynoryuoxq0eifuo.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch information of a given ENS name</td>
    </tr>
    <tr>
        <td>ERC20</td>
        <td><code>useERC20CollectionOwners(contractAddress: string)</code></td>
        <td><code>https://hyrbuxy6aivjqjrgtogd3nx5we0gcxjr.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch list of owners of a particular ERC20 collection</td>
    </tr>
    <tr>
        <td>ERC20</td>
        <td><code>useERC20CollectionTopCoins()</code></td>
        <td><code>https://2ebpropr2dgzqicposkbrvr5nq0ofyyx.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch list of the top ERC20 collections</td>
    </tr>
    <tr>
        <td>ERC20</td>
        <td><code>useERC20CollectionTransfers(contractAddress: string)</code></td>
        <td><code>https://bwqre7ze2vm3sum5avrvwzwbrm0gyxcy.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch transfer activity of a particular ERC20 collection</td>
    </tr>
    <tr>
        <td>ERC20</td>
        <td><code>useERC20Holdings(contractAddress: string)</code></td>
        <td><code>https://2i2neqclwlgygwimhbzlhdtjwa0dupee.lambda-url.us-east-1.on.aws/</code></td>
        <td>Track wallet holdings of a particular ERC20 token activity</td>
    </tr>
    <tr>
        <td>ERC20</td>
        <td><code>useERC20Transfers(contractAddress: string)</code></td>
        <td><code>https://msee4ccresifmjhm3mdedry3ki0xvdgx.lambda-url.us-east-1.on.aws/</code></td>
        <td>Track the transfer activity of a particular ERC20 token in a wallet</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionAttributes(contractAddress: string)</code></td>
        <td><code>https://7rs4acgso6ld44zjpl25jras3q0szvag.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch attributes of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionData(contractAddress: string)</code></td>
        <td><code>https://u2pdhfz4qbfkkyp6z4yg4n57hq0hzica.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionExtraData(contractAddress: string)</code></td>
        <td><code>https://b5mkshxv54bbj4d54rxze5cj6q0xhptc.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch extra data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionFloorPrice(contractAddress: string)</code></td>
        <td><code>https://343rc276twphsdjwtzrzjytepu0xdxxn.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch floor price data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionMarketCap(contractAddress: string, duration: 2 | 14 | 30)</code></td>
        <td><code>https://o5ntejtug7ixeetoqf5uxjpwgq0mbtvt.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch market cap data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionSales(contractAddress: string)</code></td>
        <td><code>https://b5xcn2afinyiq32izaoxe4mzua0ggxvm.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch sales data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionTransfers(contractAddress: string)</code></td>
        <td><code>https://lrtnsabh6hkimp4hqonw3foi2e0zzuxq.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch transfer activity of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionTrends()</code></td>
        <td><code>https://hmzkjpwut4bwaeovhryd6hie540fwvzi.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch trending ERC721 collection data</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721CollectionVolume()</code></td>
        <td><code>https://zlksxwjaikudsub4rmcc5c4eme0uqntg.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch ERC721 collections by volume data</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721Holdings(walletAddress: string)</code></td>
        <td><code>https://rmepnjzubrgdsvmb66kdwz5upm0khfor.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch ERC721 holdings of a particular wallet</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721LookupData(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://rd7cae6wlnx3lsiuncgjgeap5e0lkbew.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch data of a particular ERC721 token</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721OpenseaData(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://qoeq2n767jbu5gbiiy7463d56m0cwdec.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch Opensea data of a particular ERC721 token</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721RarityData(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://eilobcax7r4wayov2rfscraqb40rodzv.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch rarity data of a particular ERC721 token</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721SalesData(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://nhjz6tqihl6bdt7zukf5ru7wnu0ydoqq.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch sales data of a particular ERC721 token</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721TransferLookupData(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://o66cbw3kaufg5t3k2fl5ydazbq0tvfaz.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch transfer data of a particular ERC721 token</td>
    </tr>
    <tr>
        <td>ERC721</td>
        <td><code>useERC721TransfersData(walletAddress: string)</code></td>
        <td><code>https://gnfeczsyzj4v6rsyf4zmlpv23q0uixkv.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch ERC721 transfer activity of a particular wallet</td>
    </tr>
    <tr>
        <td>Gas</td>
        <td><code>useGasLookup()</code></td>
        <td><code>https://wsebjfjyi4k2kfb4mbcrcjyrqa0nwifh.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch gas information related to Ethereum or a supported layer two</td>
    </tr>
    <tr>
        <td>Prices</td>
        <td><code>useERC20Price(contractAddress: string, currentPrice: boolean, duration: 2 | 14 | 30)</code></td>
        <td><code>https://vw5caqjd3yg2oyslxcyxkln2dy0nqgxz.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch pricing data of a particular ERC20 collection</td>
    </tr>
    <tr>
        <td>Prices</td>
        <td><code>useERC721Price(contractAddress: string, tokenID: string)</code></td>
        <td><code>https://brjvjnlp35ln3solbquo6fiize0bnwje.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch pricing data of a particular ERC721 collection</td>
    </tr>
    <tr>
        <td>Prices</td>
        <td><code>useETHPrice(currentPrice: boolean, duration: 2 | 14 | 30)</code></td>
        <td><code>https://fl5mxvcm42g3n7wtodnxq52s2a0jeokj.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch Ethereum price data</td>
    </tr>
    <tr>
        <td>Prices</td>
        <td><code>useLayerTwoPrice(layerTwo: LayerTwoNetworks, currentPrice: boolean, duration: 2 | 14 | 30)</code></td>
        <td><code>https://jt7ds5ua6iix7cpa5ueg2ud2gi0joklo.lambda-url.us-east-1.on.aws/</code></td>
        <td>Fetch Layer Two price data</td>
    </tr>
</table>

<br />

## Custom Hooks
Custom hooks were incorporated into the main client hooks. The following table details the custom hooks used in this package:

<table>
    <tr>
        <th>Custom Hook</th>
        <th>Function</th>
    <tr>
    <tr>
        <td><code>useFetch<T = any>(URL: string, options: RequestInit = {})</code></td>
        <td>Readily fetch data using a set of defined parameters</td>
    </tr>
</table>

<br />

## Types
Custom data types were developed for monitoring data fetch status and defining a set of available layer two networks:

<table>
    <tr>
        <th>Custom Data Type</th>
        <th>Function</th>
    <tr>
    <tr>
        <td><code>FetchStateType</code></td>
        <td>Readily fetch data and track its state using a type with a set of defined states: <code>{ data: T | null, error: boolean, loading: boolean }</code></td>
    </tr>
    <tr>
        <td><code>LayerTwoType</code></td>
        <td>
            Set of defined Layer Two Networks: <code>optimism</code>, <code>arbitrum</code>, <code>matic-network</code>, <code>zksync</code>, <code>immutable-x</code>, <code>starknet</code>, <code>boba-network</code>, <code>sushi</code>, <code>metis-token</code>, <code>hermez-network-token</code>, <code>celer-network</code>, <code>havven</code>, <code>devve</code>, <code>loopring</code>, <code>biconomy</code>, <code>bancor</code>, <code>aave</code>, <code>perpetual-protocol</code>, <code>cartesi</code>, <code>zora</code>
        </td>
    </tr>
</table>