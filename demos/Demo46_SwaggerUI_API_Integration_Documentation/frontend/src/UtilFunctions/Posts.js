import axios from 'axios';

export const getPost = async () => {
    const URL = 'http://localhost:5000';
    const API_ENDPOINT = '/get-post-data';

    // Setting options to fetch post data
    let options = {
        method: "GET",
        headers: {
            'content-type' : 'application/json'
        }
    }

    try {
        // Making request call
        let response = await axios.get(URL + API_ENDPOINT, options);
        return response.data.databaseData; // Return post data for fetch request
    }
    catch {
        throw new Error("Could not fetch coin data");
    }
}   