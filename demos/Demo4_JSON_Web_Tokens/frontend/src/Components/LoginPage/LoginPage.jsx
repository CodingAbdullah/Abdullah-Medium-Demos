import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authReducer';
import Alert from '../Alert/Alert';
import validator from 'validator';

const LoginPage = () => {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [alert, updateAlert] = useState("");

    const tokenValue = useSelector(state => state.auth.token);
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // If token exists, redirect to home page
    useEffect(() => {
        if (tokenValue) {
            navigate("/");
        }
    }, []);

    const formHandler = (e) => {
        e.preventDefault();

        if (validator.isEmail(email)) {
            // Making a request to Login User
            dispatch(login({ email, password }));

            if (tokenValue) {
                navigate("/");
            }
            else if (error) {
                updateAlert("warning-invalid-login"); // If User could not be logged in, set an alert
            }
        }
        else {
            updateAlert("warning-invalid-login"); // If User could not be logged in, set an alert
        }
    }

    // Check to see if localStorage contains JWT token
    if (tokenValue) {
        navigate("/")
    }
    else if (isLoading){
        return <div>Loading...</div>
    }
    else {
        // Return Login Form
        return (
            <div className="login-page">
                <h1 style={{ marginTop: '1rem' }}><b>Login Form</b></h1>
                <p style={{ marginTop: '1rem' }}><i>Enter in your credentials below:</i></p>
                { alert !== '' ? <Alert type={ alert } /> : null }
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" onChange = { e => updateEmail(e.target.value) } className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" onChange = { e => updatePassword(e.target.value) } className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>             
            </div>
        )
    }
}

export default LoginPage;