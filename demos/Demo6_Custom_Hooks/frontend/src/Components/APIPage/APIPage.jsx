import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const APIPage = () => {
    const [data, updateData] = useState(null);
    const navigate = useNavigate();

    // Call the hook on component mount
    useEffect(() => {
        const fetchData = async () => {
            // Make call to request data
            try {
                let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
                updateData(response.data); // Update state data
            }
            catch (err) {
                updateData(err);
            }
        }
        fetchData();
    }, []);

    // Conditionally render component
    if (data === null) {
        return <div>Loading...</div>
    }
    // Once data fetch is complete, render data
    else {
        return (
            <div className='App'>
                <h3 style={{ marginTop: '1rem' }}><b>User ID:</b> { data.userId }</h3>
                <h4><b>ID:</b> { data.id }</h4>
                <h4><b>Title:</b> { data.title }</h4>
                <h4><b>Completed:</b> { String(data.completed) }</h4>
                <button style={{ marginTop: '1rem' }} onClick={() => navigate("/")} className="btn btn-success">
                    Go Back
                </button>
            </div>
        )
    }
}

export default APIPage;