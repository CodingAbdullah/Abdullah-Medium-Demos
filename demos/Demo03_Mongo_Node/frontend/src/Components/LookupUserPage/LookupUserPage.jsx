import { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

// Lookup User Page using state to keep track of form data
const LookupUserPage = () => {
    const [ID, updateID] = useState("");
    const [userData, updateUserData] = useState(null);
    const [alert, updateAlert] = useState("");

    const formHandler = e => {
        e.preventDefault();

        let options = {
            method: 'POST',
            body: JSON.stringify({ ID }),
            headers : {
                'content-type' : 'application/json'
            }
        }

        // Fetching User data based on ID
        axios.post('http://localhost:5000/read-user', options)
        .then((response) => {
            updateAlert("success-read-user");
            updateUserData(response.data.user);
        })
        .catch(() => {
            updateAlert("warning-read-user");
            updateUserData(null);
        });
    }

    return (
        <div className="delete-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Lookup User</b></h1>
            { alert !== "" ? <Alert type={ alert } /> : null }
            <form onSubmit={ formHandler } style={{ marginTop: '1.5rem', padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>Object ID</b></label>
                    <input onChange={ e => updateID(e.target.value) } type="text" className="form-control" required />
                    <div className="form-text" style={{ color: 'black' }}><i>The MongoDB object ID of the User object</i></div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                userData === null ? null : 
                    <>
                        <h2 style={{ marginTop: '2rem' }}>User Data</h2>
                        <h4>First Name: <b>{ userData.firstName }</b></h4>
                        <h4>Last Name: <b>{ userData.lastName }</b></h4>
                        <h4>Email : <b>{ userData.email }</b></h4>

                    </>
            }
        </div>
    )
}

export default LookupUserPage;