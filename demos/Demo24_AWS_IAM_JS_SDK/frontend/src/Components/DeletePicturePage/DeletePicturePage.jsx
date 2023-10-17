import { useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

const UploadPicturePage = () => {
    const [deleteState, updateDeleteState] = useState('');
    const idRef = useRef();

    const deletePhotoHandler = (e) => {
        e.preventDefault();
        
        updateDeleteState(''); // Reset state when button is re-clicked to delete photo

        // Set options to making delete picture request
        let options = {
            method : 'POST',
            body: JSON.stringify({ pictureId: idRef.current.value }),
            headers: {
                'content-type' : 'application/json'
            }
        }

        // Make request to delete picture to S3 bucket, set alert based on response status
        axios.post('http://localhost:5000/delete-photo', options)
        .then(() => {
            updateDeleteState('delete-success');
        })
        .catch(() => {
            updateDeleteState('danger-delete');
        });
    }

    // Render component
    return (
        <div className='delete-picture-page'>
            { deleteState === '' ? null : ( deleteState === 'success-delete' ? <Alert type='success-delete' /> : <Alert type='danger-delete' /> ) }
            <h1 style={{ marginTop: '2rem' }}>Delete Picture!</h1>
            <form style={{ marginTop: '1rem' }} onSubmit={ deletePhotoHandler }>
                <input type="text" ref={ idRef } required />
                <button style={{ marginTop: '1rem' }} type="submit" className='btn btn-success'>Click to Delete Photo</button>
            </form>
        </div>
    )

}

export default UploadPicturePage;