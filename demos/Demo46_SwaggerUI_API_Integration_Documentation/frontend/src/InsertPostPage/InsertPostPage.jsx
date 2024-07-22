import { useState } from 'react';
import axios from 'axios';
import Alert from '../Alert/Alert';

const InsertPostPage = () => {
    const [post, updatePost] = useState('');
    const [alertType, updateAlertType] = useState('');

    const insertFormHandler = e => {
        e.preventDefault();

        // Setting up request options
        let options = {
            method: 'POST',
            body: JSON.stringify({ post }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Setting alerts to inform user of request status
        axios.post('http://localhost:5000/insert-post-data', options)
        .then(() => {
            updateAlertType('success');
        })
        .catch(() => {
            updateAlertType('warning');
        });
    }

    // Insert Post Page
    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>Insert Post Page</h1>
            <p><i>Insert a post of your choice!</i></p>
            { alertType !== null ? <Alert type={ alertType } /> : null }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <label class="form-label">Insert Post</label>
                <input class="form-control" type="text" placeholder="Enter post" onChange={ e => updatePost(e.target.value) } />
                <button style={{ marginTop: '1rem' }} className="btn btn-success" type="submit" onClick={ insertFormHandler }>Insert Post</button>
            </form>
        </div>
    );
}

export default InsertPostPage;