import { useState, useRef } from 'react';
import axios from 'axios';
import validator from 'validator';
import Alert from '../Alert/Alert';

// React component enabling the update operation
const UpdateUserPage = () => {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const gender = useRef();
    const [alertType, updateAlertType] = useState("");

    const formHandler = (e) => {
        e.preventDefault();

        if (validator.isEmail(email.current.value)) {
            if (firstName.current.value === '' && lastName.current.value === '' && password.current.value === ''
                && gender.current.value === ''){
                    updateAlertType('danger-operation'); // If no information is provided, prevent any updates
            }
            else {
                // Process information to be sent to server for updating
                let options = {
                    method: 'POST',
                    body: JSON.stringify({ firstName: firstName.current.value, lastName: lastName.current.value, 
                                           email: email.current.value, password: password.current.value, 
                                           gender: gender.current.value }),
                    headers: {
                        'content-type' : 'application/json'
                    }
                }
                
                // Send information to the backend
                axios.post("http://localhost:5000/update-user", options)
                .then(response => {
                    if (response.data.message === 'No user found'){
                        updateAlertType('warning-not-found'); // Notify user that requested user does not exist
                    }
                    else if (response.data.message === 'Successfully updated User information'){
                        updateAlertType('success-operation'); // Notify user when update is successfully complete
                    }
                })  
                .catch(() => {
                    updateAlertType('danger-operation'); // Notify user if information could not be updated
                });
            }
        }
        else {
            updateAlertType('danger-operation'); // Invalid email, therefore request cannot procee
        }
    }
    
    return (
        <div className='update-user-page'>
            <h1 style={{ marginTop: '2rem' }}>Update User</h1>
            <p><i>Fill in the required details below to update user</i></p>
            { alertType !== '' ? <Alert type={ alertType } /> : null }
            <form onSubmit={ formHandler } style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input ref={ firstName } type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input ref={ lastName } type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address of the account to be updated</label>
                    <input ref={ email } type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input ref={ password } type="password" className="form-control" minLength={5} />
                </div>
                <label className='form-label'>Gender</label>
                <select ref={ gender } style={{ marginBottom: '2rem' }} className="form-select" aria-label="Default select example">
                    <option value="male" selected>Male</option>
                    <option value="female">Female</option>
                </select>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
        </div>
    )
}

export default UpdateUserPage;