import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import axios from 'axios';

const CreatePostPage = () => {  
    const [alert, updateAlert] = useState("");
    const [post, updatePost] = useState("");
    const tokenValue = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!tokenValue) {
            navigate("/"); // User not logged in? Redirect to home page
        }
    }, []);

    const formHandler = e => {
        e.preventDefault();

        if (post === ''){
            updateAlert('warning-invalid-post');
        }
        else {
            // Options for request
            let options = {
                method: 'POST',
                body: JSON.stringify({ post }),
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : 'Bearer ' + tokenValue
                }
            }

            // Request to create post
            axios.post("http://localhost:5000/create-post", options)
            .then(() => {
                updateAlert('success-valid-post');
            })
            .catch(() => {
                updateAlert('warning-invalid-post');
            });
        }
    }

    return (
        <div className="create-post-page">
            <h1><b>Create Post</b></h1>
            <p><i>Fill in the details of your post</i></p>
            { alert ? <Alert type={ alert } /> : null }
            <form onSubmit={ formHandler }>
                <div className="form-floating">
                    <textarea onChange={ e => updatePost(e.target.value) } className="form-control" placeholder="Leave a post here"></textarea>
                    <label>Post</label>
                </div>
                <button type="submit" className='btn btn-success'>Submit Post</button>
            </form>
        </div>
    )
}

export default CreatePostPage;