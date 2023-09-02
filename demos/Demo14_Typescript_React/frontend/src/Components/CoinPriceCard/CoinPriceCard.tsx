import Badge from '../Badge/Badge';

// CoinPriceCard Custom Bootstrap Card Component
const CoinPriceCard = (props: { cardData: { coinType: String, coinData: any }}) => {
    const { coinType, coinData } = props.cardData;

    return (
        <div className="coin-price-card">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <Badge data={{ type: "warning", message: coinType }} />
                    <hr />
                    <p className="card-text">Price: 
                        <b>
                            { "$" + coinData[Object.keys(coinData)[0]].usd + " USD" }
                        </b>
                    </p>
                    <p className="card-text">24 Hr Price % Change:
                    { 
                        coinData[Object.keys(coinData)[0]].usd_24h_change > 0 ?
                            <Badge data={{ 
                                type: 'warning', 
                                data: "+" + coinData[Object.keys(coinData)[0]].usd_24h_change.toPrecision(4) + "%" }}
                            /> 
                            :
                            <Badge data={{ 
                                type: "danger",
                                data: coinData[Object.keys(coinData)[0]].usd_24h_change.toPrecision(4) + "%" }}
                            />
                    } 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CoinPriceCard;