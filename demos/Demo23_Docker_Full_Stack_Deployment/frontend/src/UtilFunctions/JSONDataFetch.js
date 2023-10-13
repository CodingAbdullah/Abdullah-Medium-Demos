import axios from 'axios';

export const JSONDataFetch = async () => {
    let data = [];

    const response = await axios.get('http://localhost/fetch-api-data'); // Fetch Data

    if (response.status === 200){
        data.push(response.data);
    }
    else {
        throw new Error("Could not fetch data");
    }

    return data;
}