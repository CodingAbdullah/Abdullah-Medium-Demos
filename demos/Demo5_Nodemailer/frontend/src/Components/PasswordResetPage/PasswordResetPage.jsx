import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '../Alert/Alert';

const PasswordResetPage = () => {
    const [emailAddress, updateEmailAddress] = useState("");
    const [id, updateID] = useState("");
    const [newPassword, updatePassword] = useState("");
    const [confirmPassword, updateConfirmPassword] = useState("");
    const [alert, updateAlert] = useState("");
    const [emailCheck, updateEmailCheck] = useState(false);
    const [passwordCheck, updatePasswordCheck] = useState(false);
    const tokenValue = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    
    // Check to see if the user is already logged in, redirect. User must not be logged in to password reset
    useEffect(() => {
        if (tokenValue){
            navigate("/")
        }
    }, []);

    const tokenFormHandler = (e) => {
        e.preventDefault();

        // Setting options to request email token
        let options = {
            method: 'POST',
            body: JSON.stringify({ email : emailAddress }),
            headers: {
                'content-type' : 'application/json'
            }
        };

        // Set email token when request is made
        axios.post('http://localhost:5000/create-email-token', options)
        .then(() => {
            updateAlert("success-valid-token");
            updateEmailCheck(true);
        })
        .catch(() => {
            updateEmailCheck(false);
            updateAlert("warning-invalid-token");
        });
    }

    const passwordResetHandler = (e) => {
        e.preventDefault();

        // If passwords do not match, throw alert
        if (newPassword !== confirmPassword) {
            updateAlert('warning-invalid-reset');
        }
        else {
            // Set options to make request to the backend
            let options = {
                method: 'POST',
                body: JSON.stringify({ email: emailAddress, ID: id, password: newPassword }),
                headers: {
                    'content-type' : 'application/json'
                }
            };

            // Request to delete email token after password is reset
            axios.post('http://localhost:5000/delete-email-token', options)
            .then(() => {
                updatePasswordCheck(true);
                updateAlert('success-password-reset');
            })
            .catch(() => {
                updatePasswordCheck(false);
                updateAlert('warning-invalid-reset');
            });
        }
    }

    return (
        <div className='password-reset-page'>
            <h1 style={{ marginTop: '1rem' }}><b>Password Reset</b></h1>
            <p><i>Enter in details to successfully reset password</i></p>
            { alert !== '' ? <Alert type={ alert } /> : null }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ tokenFormHandler }>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" disabled={ emailCheck ? true : false } className="form-control" onChange={e => updateEmailAddress(e.target.value) } />
                </div>
                <button type="submit" disabled={ emailCheck ? true : false } className="btn btn-primary">Request Reset ID</button>
            </form>
            {
                emailCheck ? 
                    <>
                        <h1 style={{ marginTop: '5rem' }}>Reset your password</h1>
                        <p><i>Enter in the token ID, new password and confirm password to successfully reset it: </i></p>
                        <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ passwordResetHandler }>
                            <div className="mb-3">
                                <label className="form-label">Email Reset Verification ID</label>
                                <input type="text" className="form-control" disabled={ passwordCheck ? true : false } onChange={ e => updateID(e.target.value) } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" disabled={ passwordCheck ? true : false } onChange={ e => updatePassword(e.target.value) } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" disabled={ passwordCheck ? true : false } onChange={ e => updateConfirmPassword(e.target.value) } />
                            </div>
                            <button style={{ marginBottom: '2rem' }} type="submit" disabled={ passwordCheck ? true : false } className="btn btn-success">Reset Password</button>
                        </form>

                    </>
                    : null
            }
        </div>

    )
}

export default PasswordResetPage;