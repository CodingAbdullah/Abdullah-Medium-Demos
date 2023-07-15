import { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

// Update User Page using state to keep track of data
const UpdateUserPage = () => {
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [password, updatePassword] = useState("");
    const [email, updateEmail] = useState("");
    const [alert, updateAlert] = useState("");

    const formHandler = e => {
        e.preventDefault();

        let options = {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: {
                'content-type': 'application/jsons'
            }
        }

        // Updating User data based on form data
        axios.post("http://localhost:5000/update-user", options)
        .then(() => {
            updateAlert('success-update-user');
        })
        .catch(() => {
            updateAlert('warning-update-user');
        });
    }

    return (
        <div className="create-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Update User</b></h1>
            <p><i>Provide the email address of the User to update along with information to update</i></p>
            { alert !== "" ? <Alert type={ alert } /> : null }
            <form onSubmit={ formHandler } style={{ padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>First Name</b></label>
                    <input onChange={ e => updateFirstName(e.target.value) } type="text" className="form-control" />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Last Name</b></label>
                    <input onChange={ e => updateLastName(e.target.value) } type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label"><b><span style={{ color: 'red' }}>**REQUIRED**</span> -- Email address -- <span style={{ color: 'red' }}>**REQUIRED**</span></b></label>
                    <input onChange={ e => updateEmail(e.target.value) } type="email" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Password</b></label>
                    <input onChange={ e => updatePassword(e.target.value) } type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateUserPage;