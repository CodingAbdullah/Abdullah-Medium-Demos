import axios from 'axios';

export const fetchUserData = async () => {
    // Simply make a call to the back-end and fetch Users from DocumentDB
    let response = await axios.get('http://localhost:5000/read-user');

    // If status is OK, return data. If not, throw error
    if (response.status === 200){
        return response.data;
    }
    else {
        throw new Error("Could not fetch Users");
    }
}