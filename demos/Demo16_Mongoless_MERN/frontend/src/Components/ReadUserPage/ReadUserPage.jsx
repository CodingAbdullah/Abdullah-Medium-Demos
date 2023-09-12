import { useEffect, useState } from 'react';
import Alert from '../Alert/Alert';
import UserDataTable from '../UserDataTable/UserDataTable';
import axios from 'axios';

// React component enabling the delete operation
const ReadUserPage = () => {
    const [userData, updateUserData] = useState(null);
    const [alertType, updateAlertType] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/read-user')
        .then(response => {
            let information = JSON.parse(response.data.userData);
            if (information.length === 0) {
                updateAlertType('warning-not-found');
            }
            updateUserData(information);
        })
        .catch(() => {
            updateAlertType('danger-operation'); // If error is thrown, return an alert
            updateUserData(null);
        });
    }, []);

    // Render information and display data as an organized table
    return (
        <div className='create-user-page'>
            <h1 style={{ marginTop: '2rem' }}>Read Users</h1>
            <p><i>Below are all the users stored inside the MySQL database</i></p>
            { alertType !== '' ? <Alert type={ alertType } /> : null }
            { userData === null || alertType !== '' ? null : <UserDataTable userDatabaseInformation={ userData } /> }
        </div>
    )
}

export default ReadUserPage;