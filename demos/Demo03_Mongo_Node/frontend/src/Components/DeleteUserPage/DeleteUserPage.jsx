import { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

const DeleteUserPage = () => {
    const [ID, updateID] = useState("");
    const [alert, updateAlert] = useState("");

    const formHandler = e => {
        e.preventDefault();

        let options = {
            method: 'POST',
            body: JSON.stringify({ ID }),
            headers : {
                'content-type' : 'application/json'
            }
        }

        // Deleting User based on request
        axios.post('http://localhost:5000/delete-user', options)
        .then(() => {
            updateAlert('success-delete-user');
        })
        .catch(() => {
            updateAlert('warning-delete-user');
        });
    }

    return (
        <div className="delete-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Delete User</b></h1>
            { alert !== "" ? <Alert type={ alert } /> : null }
            <form onSubmit={ formHandler } style={{ marginTop: '1.5rem', padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>Object ID</b></label>
                    <input onChange={ e => updateID(e.target.value) } type="text" className="form-control" required />
                    <div className="form-text" style={{ color: 'black' }}><i>The MongoDB object ID of the User object</i></div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeleteUserPage;