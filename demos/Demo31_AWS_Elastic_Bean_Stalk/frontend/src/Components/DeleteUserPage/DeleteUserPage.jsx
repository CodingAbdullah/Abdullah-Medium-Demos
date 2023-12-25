import { useState, useRef } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';

// React component enabling the delete operation
const DeleteUserPage = () => {
    const email = useRef();
    const [alertType, updateAlertType] = useState('');

    const formHandler = (e) => {
        e.preventDefault();

        // Validate email before proceeding
        if (validator.isEmail(email.current.value)){
            let options = {
                method: 'POST',
                body: JSON.stringify({ email: email.current.value }),
                headers : {
                    'content-type' : 'application/json'
                }
            }

            axios.post('http://localhost:5000/delete-user', options)
            .then(response => {
                if (response.data.message === 'No such user exists!') {
                    updateAlertType('warning-not-found'); // Notify user does not exist
                }
                else if (response.data.message === 'User successfully deleted'){
                    updateAlertType('success-operation'); // Notify user of successful operation
                }
            })
            .catch(() => {
                updateAlertType('danger-operation'); // If error is thrown, return an alert
            });
        }
        else {
            updateAlertType('danger-operation'); // If error is thrown, return an alert
        }
    }

    return (
        <div className='create-user-page'>
            <h1 style={{ marginTop: '2rem' }}>Delete User</h1>
            <p><i>Fill in the required details below to delete user</i></p>
            { alertType !== '' ? <Alert type={ alertType } /> : null }
            <form onSubmit={ formHandler } style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input ref={ email } type="email" className="form-control" aria-describedby="emailHelp" required />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default DeleteUserPage;