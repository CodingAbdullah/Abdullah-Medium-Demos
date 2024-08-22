import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useQuery } from '@tanstack/react-query';
import { pricesQuery } from '../../UtilFunctions/pricesQuery';

// Custom React component for Ag Grid Table
const ReactAgGridTable = () => {

    const pricesQuery = useQuery({
        queryKey: ['prices'],
        queryFn: pricesQuery
    });

    if (pricesQuery.isPending || pricesQuery.isLoading) {
        return <div>Loading...</div>
    }
    else if (pricesQuery.isError || pricesQuery.error) {
        return <div>Error loading table</div>
    }
    else {   
        // More to go here later.. 
        return (
            <div className='react-ag-grid-table'>

            </div>
        )
    }
}

export default ReactAgGridTable;