import Badge from "../Badge/Badge";

const CoinPriceCard = (props) => {
    const { coinType, coinData } = props; // Extract data for badge and card display

    // Search Coin Data keys and access the first coin key dynamically and display information
    return (
        <div className="coin-price-card">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <Badge type="warning" message={ coinType } />
                    <hr />
                    <p className="card-text">Price: 
                        <b>
                            { "$" + coinData[Object.keys(coinData)[0]].usd + " USD" }
                        </b>
                    </p>
                    <p className="card-text">24 Hr Price % Change:
                    { 
                    coinData[Object.keys(coinData)[0]].usd_24h_change > 0 ?
                        <Badge type="success" 
                            message={"+" + coinData[Object.keys(coinData)[0]].usd_24h_change.toPrecision(4) + "%" } />
                        :
                        <Badge type="danger" 
                            message={ coinData[Object.keys(coinData)[0]].usd_24h_change.toPrecision(4) + "%" } />
                    } 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CoinPriceCard;