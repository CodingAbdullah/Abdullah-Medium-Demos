import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BitcoinHistoricPriceAction } from '../utilFunctions/bitcoinPrice.ts';

const BitcoinPriceTable: FC = () => {

    const bitcoinPriceQuery = useQuery({
        queryKey: ['Bitcoin Price'],
        queryFn: BitcoinHistoricPriceAction
    });

    // Conditionally render price table
    if (bitcoinPriceQuery.isLoading || bitcoinPriceQuery.isPending) {
        return <div>Loading...</div>
    }
    else if (bitcoinPriceQuery.error || bitcoinPriceQuery.isError){
        return <div>Error loading price data</div>
    }
    else {
        return (
            <table style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bitcoinPriceQuery.data.coinPrices.map(dayPrice => {
                            return (
                                <>
                                    <tr>
                                        <td>{dayPrice.time}</td>
                                        <td>{dayPrice.price}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default BitcoinPriceTable;