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

    useEffect(() => {
        if (!tokenValue) {
            navigate("/"); // User not logged in? Redirect to home page
        }
        else {
            // Code for fetching posts will go here
        }
    }, []);

    return (
        <div className='view-posts-page'>
            <h1>User Post data</h1>
            <table>
                
            </table>
        </div>
    )
}

export default ViewPostsPage;