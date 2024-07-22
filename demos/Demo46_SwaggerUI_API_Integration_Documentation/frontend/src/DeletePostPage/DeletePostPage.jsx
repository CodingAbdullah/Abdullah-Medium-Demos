import { useState } from 'react';
import PostSelector from '../PostSelector/PostSelector';
import Alert from '../Alert/Alert';
import axios from 'axios';

const DeletePostPage = () => {
    const [ID, updatePostID] = useState('');
    const [alert, updateAlert] = useState('');

    // Update Post IDs using this function and pass down as prop
    const postIDHandler = e => {
        updatePostID(e.target.value);
    }

    // Delete handler function for handling post deletion
    const deleteFormHandler = e => {
        e.preventDefault();

        if (ID === '' || ID === '---') {
            updateAlert('warning');
            return;
        }
        else {
            updateAlert('');
            axios.delete('http://localhost:5000/delete-post-data', {
                params : {
                    ID
                }
            })
            .then(() => {
                updateAlert('success');
            })
            .catch(() => {
                updateAlert('warning');
            });
        }
    }

    // Pass down props to PostSelector component
    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>Delete Post Page</h1>
            <p><i>Choose from the Post IDs below to select which one to delete</i></p>  
            { alert !== '' ? <Alert type={ alert } /> : null }
            <form>
                <PostSelector postIDChangeHandler={ postIDHandler } />
                <button style={{ marginTop: '1rem' }} className="btn btn-success" type="submit" onClick={ deleteFormHandler }>Delete Post</button>
            </form>
        </div>
    );
}   

export default DeletePostPage;