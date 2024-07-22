import { useState } from 'react';
import PostSelector from '../PostSelector/PostSelector';
import Alert from '../Alert/Alert';
import axios from 'axios';

// Update Post Page component
const UpdatePostPage = () => {
    const [ID, updatePostID] = useState('');
    const [alert, updateAlert] = useState('');
    const [newPost, updateNewPost] = useState('');

    const postIDHandler = e => {
        updatePostID(e.target.value);
    }

    const updateFormHandler = e => {
        e.preventDefault();

        if (ID === '' || ID === '---') {
            updateAlert('warning');
            return;
        }
        else {
            updateAlert('');
            axios.put('http://localhost:5000/update-post-data', {
                ID,
                post: newPost
            })
            .then(() => {
                updateAlert('success');
            })
            .catch(() => {
                updateAlert('warning');
            });
        }
    }

    return (
        <div className="update-post-page">
            <h1 style={{ marginTop: '1.5rem' }}>Update Post Page</h1>
            <p><i>Update a current post by selecting its ID and entering a new value!</i></p>
            { alert !== '' ? <Alert type={ alert } /> : null }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <PostSelector postIDChangeHandler={ postIDHandler } />
                <label style={{ marginTop: '1rem' }} class="form-label" htmlFor="new-post">Enter new post</label>
                <input class="form-control" type="text" placeholder="Enter new post" onChange={ e => updateNewPost(e.target.value) } />
                <button style={{ marginTop: '1rem' }} className="btn btn-primary" type="submit" onClick={ updateFormHandler }>Update Post</button>
            </form>
        </div>
    )
}

export default UpdatePostPage;