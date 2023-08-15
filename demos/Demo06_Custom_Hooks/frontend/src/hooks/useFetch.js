import { useEffect, useState } from 'react';
import axios from 'axios';

// "use" syntax to signify a hook
const useFetch = (url) => {
    const [data, updateData] = useState(''); // Using useState to store fetched data

    // Upon call, run useEffect and fetch data using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(url);
                updateData(response.data);
            }
            catch (err) {
                updateData(err);
            }
        }
        fetchData();
    }, [url]);

    // Return fetched data
    return data;
}


export default useFetch;