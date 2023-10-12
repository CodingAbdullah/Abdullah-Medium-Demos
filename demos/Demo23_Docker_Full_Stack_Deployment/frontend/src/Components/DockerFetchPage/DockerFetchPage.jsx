import { useQuery } from '@tanstack/react-query';
import { JSONDataFetch } from '../../UtilFunctions/JSONDataFetch';

const DockerFetchPage = () => {

    // JSON Data Fetch
    let JSONDataQuery = useQuery({
        queryKey: ['data Fetch'],
        queryFn: JSONDataFetch
    });

    if (JSONDataQuery.isError){
        return <div>Error Fetching Data</div>
    }
    else if (JSONDataQuery.isLoading){
        return <div></div>
    }
    else if (JSONDataQuery.isSuccess) {
        return (
            <div className='docker-fetch-page'>
                <h3 style={{ marginTop: '2rem' }}>User ID: { JSONDataQuery.data[0].jsonData.userId }</h3>
                <p>ID: { JSONDataQuery.data[0].jsonData.id }</p>
                <p>Title: { String(JSONDataQuery.data[0].jsonData.title) }</p>
                <p>Completed: { String(JSONDataQuery.data[0].jsonData.completed) }</p>
            </div>
        )
    }
}

export default DockerFetchPage;