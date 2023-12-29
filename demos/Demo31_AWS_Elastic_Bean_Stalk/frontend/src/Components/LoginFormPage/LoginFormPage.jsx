import { useRef } from 'react';

// Login Form Page Component
const LoginFormPage = () => {
    const email = useRef();
    const password  = useRef();
    
    const formHandler = (e) => {
        e.preventDefault();

        // Simply display an alert with login information
        alert("Email is: " + email.current.value + ". Password is: " + password.current.value);
    }

    return (
        <div className="login-form">
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>Login Form</h1>
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" ref={ email } className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" ref={ password } className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LoginFormPage;