import { useEffect, useState } from 'react';
import Alert from '../Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../redux/reducers/authReducer';
import validator from 'validator';

const LoginPage = () => {
    const [ alert, updateAlert ] = useState(false); // Initially, set alert to false
    const [ email, updateEmail ] = useState(""); 
    const [ password, updatePassword ] = useState("");
    const dispatch = useDispatch(); // To be used to dispatch Redux actions
    const navigate = useNavigate();

    const error = useSelector(state => state.auth.isError);
    const loading = useSelector(state => state.auth.isLoading);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const formHandler = (e) => {
        e.preventDefault(); // Prevent page refresh on form submission

        // Check if the email the user has entered is valid
        if (validator.isEmail(email)){
            dispatch(login({ email, password }));

            if (error){
                updateAlert(true);
            }
            else if (user) {
                navigate("/");
            }
        }
        else {
            updateAlert(true);
        }
    }

    if (loading){
        return <div>Loading...</div>
    }
    else if (user){
        navigate("/");
    }
    else {
        return (
            <div className="login-page">
                <h1>Login Form</h1>
                { alert ? <Alert type="warning" /> : null }
                <form onSubmit={ formHandler }>
                    <div class="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" onChange = { e => updateEmail(e.target.value) } className="form-control" />
                    </div>
                    <div class="mb-3">
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