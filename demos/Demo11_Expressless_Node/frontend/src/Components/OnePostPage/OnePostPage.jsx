import { useEffect, useState } from 'react';
import axios from 'axios';

const OnePostPage = () => {
    const [postData, updatePostData] = useState(null);

    useEffect(() => {
        // Make a call as component mounts
        axios.post('http://localhost:5000/one-post')
        .then(response => {
            updatePostData(response.data);
        })
        .catch(() => {
            updatePostData(null);
        });
    }, []);

    // Presenting Post Data
    if (postData === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="one-post-page">
                <h1 style={{ marginTop: '2rem', paddingBottom: '1rem' }}>Post Data</h1>
                <p>Post ID: <b>{ postData.postId }</b></p>
                <p>ID: <b>{ String(postData.id) }</b></p>
            </div>
        )
    }
}

export default OnePostPage;