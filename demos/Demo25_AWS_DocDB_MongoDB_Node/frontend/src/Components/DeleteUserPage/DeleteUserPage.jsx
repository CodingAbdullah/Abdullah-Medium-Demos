import { useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

const DeleteUserPage = () => {
    const userId = useRef();
    const [setAlert, updateAlert] = useState('');

    // Request to delete User
    const formHandler = (e) => {
        e.preventDefault();
        
        // Make request, set special data object for request
        axios.delete('http://localhost:5000/delete-user', { data: { userID: userId.current?.value }})
        .then(() => {
            updateAlert('success-deleteUser'); // Set Alert if User is deleted
        })
        .catch(() => {
            updateAlert('danger-deleteUser'); // Set Alert if user cannot be delete
        })
    }

    // Request User ID to delete requested User
    return (
        <div className='delete-user-page'>
            { setAlert !== '' ? <Alert type={ setAlert } /> : null }
            <h1 style={{ marginTop: '1rem' }}>Delete User</h1>
            <p><i>Enter in User ID to delete a requested User</i></p>
            <form style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <input type="text" ref={ userId } className="form-control" aria-describedby="emailHelp" placeholder="User ID" required />
                <button style={{ marginTop: '1rem' }} type='submit' className='btn btn-danger'>Delete User</button>
            </form>
        </div>
    )
}

export default DeleteUserPage;