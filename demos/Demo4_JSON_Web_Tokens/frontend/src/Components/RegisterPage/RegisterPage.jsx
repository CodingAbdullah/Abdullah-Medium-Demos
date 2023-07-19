import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '../Alert/Alert';

const RegisterPage = () => {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const tokenValue = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    
    useEffect(() => {
        // User is already logged in, redirect to home page
        if (tokenValue){
            navigate("/")
        }    
    }, []);

    const formHandler = e => {
        e.preventDefault();

        // Code will go here
    }

    // Bootstrap form into a React component
    return (
        <div className='register-page'>
            <h1><b>Register User</b></h1>
            <p><i>Enter in registration details</i></p>
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegisterPage;