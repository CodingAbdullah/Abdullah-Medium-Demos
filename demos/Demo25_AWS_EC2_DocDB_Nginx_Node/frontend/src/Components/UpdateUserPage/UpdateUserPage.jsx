import { useRef, useState } from 'react';
import axios from 'axios';
import Alert from '../Alert/Alert';

const UpdateUserPage = () => {
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const [setAlert, updateAlert] = useState('');

    const formHandler = e => {
        e.preventDefault();

        // Setting options to update User information
        let options = {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers : {
                'content-type': 'application/json'
            }
        }

        // Make request to update User information
        axios.post('http://localhost:5000/update-user', options)
        .then(() => {
            updateAlert('success-updateUser'); // Set Alert if User information is updated
        })
        .catch(() => {
            updateAlert('danger-updateUser'); // Set Alert if User information is not updated
        })
    }
    
    return (
        <div className='update-user-page'>
            { setAlert !== '' ? <Alert type={ setAlert } /> : null }
            <h1 style={{ marginTop: '1rem' }}>Update User Information</h1>
            <p><i>Enter in the required fields to successfully update an existing User!</i></p>
            <form style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" onChange={ e => updateFirstName(e.target.value) } className="form-control" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" onChange={ e => updateLastName(e.target.value) } className="form-control" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={ e => updateEmail(e.target.value) } className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={ e => updatePassword(e.target.value) } className="form-control" placeholder="Password" />
                </div>
                <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default UpdateUserPage;