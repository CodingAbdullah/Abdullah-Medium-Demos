import { useEffect, useState } from "react";
import axios from 'axios';

const MultiplePostsPage = () => {
    const [postsData, updatePostsData] = useState(null);

    useEffect(() => {
        // Make a call as component mounts
        axios.post('http://localhost:5000/posts')
        .then(response => {
            updatePostsData(response.data);
        })
        .catch(() => {
            updatePostsData(null);
        });
    }, []);

    // Presenting Posts Data
    if (postsData === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="multiple-posts-page">
                <h1 style={{ marginTop: '2rem', paddingBottom: '1rem' }}>Posts Data</h1>
                <p>Method Type: <b>{ postsData.method }</b></p>
                <p>ID: <b>{ postsData.id }</b></p>
            </div>
        )
    }
}

export default MultiplePostsPage;