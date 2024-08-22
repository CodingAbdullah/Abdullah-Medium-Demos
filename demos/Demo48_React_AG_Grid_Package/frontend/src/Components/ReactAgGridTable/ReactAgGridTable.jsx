import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useQuery } from '@tanstack/react-query';
import { coinInfo } from '../../UtilFunctions/coinInfo';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

// Custom React component for AG Grid Table
const ReactAgGridTable = () => {

    let coinTableRowData = [];
    let item = {};
    
    // React-Query for efficiently fetching coin information
    const coinInformationQuery = useQuery({
        queryKey: ['prices'],
        queryFn: coinInfo
    });

    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs, setColumnDefs] = useState([
        { field: "name", headerName: 'Name', flex: 1 },
        { field: "symbol", headerName: "Symbol", flex: 1, 
            cellRenderer: (params) => {
                return (
                    <p><img src={ params.value.split(" - ")[1] } alt="Thumbnail" style={{ width: '20px', height: '20px' }} />{" "}{ String(params.value.split(" - ")[0]).toUpperCase() }</p>
                )
            }
        },
        { field: "currentPrice", headerName: "Price", flex: 1 },
        { field: "percentageChange24Hours", headerName: "24 Hr % Change", flex: 1,
            cellRenderer: (params) => {
                return (
                    <p style={{ color: String(params.value).charAt(0) === '+' ? 'green' : 'red' }}><b>{ params.value }</b></p>
                )
            }
        }
    ]);

    // Conditionally rendering component
    if (coinInformationQuery.isPending || coinInformationQuery.isLoading) {
        return <div>Loading...</div>
    }
    else if (coinInformationQuery.isError || coinInformationQuery.error) {
        return <div>Error loading table</div>
    }
    else {   
        // Render AG Grid React component with row and column data
        // Display coin price data
        // Format the coin information data
        for (var i = 0; i < 3; i++) {
            item = {
                name: coinInformationQuery?.data[i].name,
                symbol: coinInformationQuery?.data[i].symbol + " - " + coinInformationQuery?.data[i].image.thumb,
                currentPrice: "$" + coinInformationQuery?.data[i].market_data.current_price.usd + " USD",
                percentageChange24Hours: coinInformationQuery?.data[i].market_data.price_change_percentage_24h >= 0 ? "+" + Number(coinInformationQuery?.data[i].market_data.price_change_percentage_24h).toFixed(2) + "%" : Number(coinInformationQuery?.data[i].market_data.price_change_percentage_24h).toFixed(2) + "%"
            }

            coinTableRowData.push(item);
            item = {};
        }

        // Rendering the custom table using AG Grid React
        return (
            <>
                <p style={{ marginTop: '1.5rem' }}><i><b>Cryptocurrency Price Information</b></i></p>
                <div className="ag-theme-quartz" style={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', height: 260, width: '100%' }}>
                    <AgGridReact
                        rowData={ coinTableRowData }
                        columnDefs={ columnDefs } />
                </div>
            </>
        )
    }
}

export default ReactAgGridTable;