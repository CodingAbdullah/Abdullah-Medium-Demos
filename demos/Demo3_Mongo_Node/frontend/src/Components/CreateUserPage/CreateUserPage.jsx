import { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator'

// Create User Page using state to keep track of form data
const CreateUserPage = () => {
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [alert, updateAlert] = useState("");

    const formHandler = e => {
        e.preventDefault();

        if (validator.isEmail(email)){
            let options = {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email, password }),
                headers : {
                    'content-type' : 'application/json'
                }
            }

            // Creating User based on form data
            axios.post('http://localhost:5000/create-user', options)
            .then(() => {
                updateAlert("success-create-user");
            })
            .catch(() => {
                updateAlert("warning-create-user");
            });
        }
        else {
            updateAlert("warning-create-user");
        }
    }

    return (
        <div className="create-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Create User</b></h1>
            <p><i>Register a User</i></p>
            { alert !== "" ? <Alert type={ alert } /> : null }
            <form onSubmit={ formHandler } style={{ padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>First Name</b></label>
                    <input onChange={ e => updateFirstName(e.target.value) } type="text" className="form-control" required />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Last Name</b></label>
                    <input onChange={ e => updateLastName(e.target.value) } type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label"><b>Email address</b></label>
                    <input onChange={ e => updateEmail(e.target.value) } type="email" class="form-control" required />
                    <div className="form-text" style={{ color: 'black' }}><i>We'll never share your email with anyone else.</i></div>
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Password</b></label>
                    <input onChange={ e => updatePassword(e.target.value) } type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateUserPage;