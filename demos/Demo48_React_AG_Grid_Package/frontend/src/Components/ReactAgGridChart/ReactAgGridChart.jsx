import { AgChartsReact } from 'ag-charts-react';
import { useQuery } from '@tanstack/react-query';
import { bitcoinPriceInfo } from '../../UtilFunctions/bitcoinPriceInfo';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const ReactAgGridChart = () => {

    // Historical price information related to Bitcoin
    const bitcoinPriceQuery = useQuery({
        queryKey: ['bitcoin price'],
        queryFn: bitcoinPriceInfo
    });
    
    // Conditionally render component
    if (bitcoinPriceQuery.isLoading || bitcoinPriceQuery.isPending) {
        return <div>Loading...</div>
    }
    else if (bitcoinPriceQuery.isError || bitcoinPriceQuery.error) {
        return <div>Error Loading Bitcoin data...</div>
    }
    else {
        // Set the y-axis to scale based on market cap data
        let minValue = Math.min(...bitcoinPriceQuery.data?.map(price => price[1]));
        let maxValue = Math.max(...bitcoinPriceQuery.data?.map(price => price[1]));

        // Display chart information containing Bitcoin price data
        return (
            <>
                <p style={{ marginTop: '1.5rem' }}><i><b>Historical Bitcoin Price Information</b></i></p>
                <div className="ag-theme-quartz" style={{ height: 350, width: '100%' }}>
                    <AgChartsReact options={{
                        // Data: Data to be displayed in the chart
                        data: bitcoinPriceQuery.data,
                        // Series: Defines which chart type and data to use
                        series: [{ type: 'line', xName:'Time', yName: 'Price', xKey: 'time', yKey: 'price' }],
                        title: {
                            text:  `Bitcoin Price Data`
                        },
                        subtitle: {
                            text: "Last 30 Days"
                        },
                        legend: {
                            enabled: true
                        },
                        axes: [
                            {
                                type: 'string',
                                position: 'bottom',
                                title: {
                                    text: 'Time'
                                }
                            },
                            {
                                type: 'number',
                                position: 'left',
                                title: {
                                    text: 'Price'
                                },
                                domain: [minValue, maxValue]
                            }
                        ]
                    }} />
                </div>
            </>
        );
    }
}

export default ReactAgGridChart;