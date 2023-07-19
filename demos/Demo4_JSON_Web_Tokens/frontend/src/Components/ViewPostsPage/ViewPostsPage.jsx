import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Alert from '../Alert/Alert';

const ViewPostsPage = () => {
    const tokenValue = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const [postData, updatePostData] = useState({
        information: null
    });
    const [alert, updateAlert] = useState("");

    useEffect(() => {
        if (!tokenValue) {
            navigate("/"); // User not logged in? Redirect to home page
        }
        else {
            // Fetching posts...
            axios.get("http://localhost:5000/lookup-post")
            .then(response => {
                // Updating post data, making sure prevState represents all those parts of the object that remain unchanged
                updatePostData((prevState) => {
                    return {
                        ...prevState,
                        information: response.data.userPostData
                    }
                });
            })
            .catch(() => {
                updateAlert('warning-fetch-post');
            });
        }
    }, []);

    // Wrap table into a React component and map records to rows inside of it
    return (
        <div className='view-posts-page'>
            <h1><b>Your Post Data</b></h1>
            <p><i>Here are your list of posts: </i></p>
            { alert ? <Alert type={ alert } /> : null }
            <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Post</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postData.information.map(record => {
                            return (
                                <tr>
                                    <td>{ record.postID }</td>
                                    <td>{ record.createdAt.split("T")[0] + " - " + record.createdAt.split("T")[1].split(".")[0] }</td>
                                    <td>{ record.post }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewPostsPage;