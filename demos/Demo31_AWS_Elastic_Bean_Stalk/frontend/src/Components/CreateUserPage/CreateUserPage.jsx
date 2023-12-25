import { useState, useRef } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';

// Create User Page Component
const CreateUserPage = () => {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const gender = useRef();
    const [alertType, updateAlertType] = useState('');

    const formHandler = (e) => {
        e.preventDefault();

        // Validate email before proceeding
        if (validator.isEmail(email.current.value)){
            let options = {
                method: 'POST',
                body: JSON.stringify({ firstName: firstName.current.value, lastName: lastName.current.value, 
                                       email: email.current.value, password: password.current.value, 
                                       gender: gender.current.value }),
                headers : {
                    'content-type' : 'application/json'
                }
            }

            axios.post('http://localhost:5000/create-user', options)
            .then(response => {
                if (response.data.message === 'User already exists') {
                    updateAlertType('warning-user-exists'); // Notify user already registered
                }
                else if (response.data.message === 'Successfully stored User to database'){
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
            <h1 style={{ marginTop: '2rem' }}>Create User</h1>
            <p><i>Fill in the required details below to create user</i></p>
            { alertType !== '' ? <Alert type={ alertType } /> : null }
            <form onSubmit={ formHandler } style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input ref={ firstName } type="text" className="form-control" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input ref={ lastName }type="text" className="form-control" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input ref={ email } type="email" className="form-control" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input ref={ password } type="password" className="form-control" minLength={5} required />
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

export default CreateUserPage;