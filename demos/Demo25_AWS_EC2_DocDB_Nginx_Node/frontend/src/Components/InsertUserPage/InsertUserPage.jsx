import axios from 'axios';
import { useRef, useState } from 'react';
import Alert from '../Alert/Alert';

const InsertUserPage = () => {
    // Setting ref hooks to track form data
    const firstName = useRef();
    const lastName = useRef();
    const emailAddress = useRef();
    const password = useRef();

    const [setAlert, updateAlert] = useState('');

    const formHandler = (e) => {
        e.preventDefault();

        // Set options to insert User
        let options = {
            method: 'POST',
            body: JSON.stringify({ 
                    firstName: firstName.current?.value, 
                    lastName: lastName.current?.value,
                    email: emailAddress.current?.value,
                    password: password.current?.value 
                }),
            headers: {
                'content-type' : 'application/json'
            }
        }

        // Make a call to the back-end requesting to insert new User
        axios.post('http://localhost:5000/insert-user', options)
        .then(() => {
            updateAlert('success-insertUser'); // Updating Alert status
        })
        .catch(() => {
            updateAlert('danger-insertUser'); // Updating Alert status
        });
    }
    
    // Collecting form data to sign up a new User
    return (
        <div className='insert-user-page'>
            { setAlert !== '' ? <Alert type={ setAlert } /> : null }
            <h1 style={{ marginTop: '1rem' }}>User Sign Up</h1>
            <p><i>Enter in the required fields to successfully sign up a new User!</i></p>
            <form style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" ref={ firstName } className="form-control" aria-describedby="emailHelp" placeholder="First Name" required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" ref={ lastName } className="form-control" aria-describedby="emailHelp" placeholder="Last Name" required />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" ref={ emailAddress } className="form-control" aria-describedby="emailHelp" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" ref={ password } className="form-control" placeholder="Password" required />
                </div>
                <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default InsertUserPage;