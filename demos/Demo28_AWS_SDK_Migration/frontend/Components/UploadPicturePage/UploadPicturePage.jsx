import { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

const UploadPicturePage = () => {
    const [uploadState, updateUploadState] = useState('');

    const uploadPhotoHandler = (e) => {
        e.preventDefault();
        
        updateUploadState(''); // Reset state when button is re-clicked to upload photo

        // Make request to upload picture to S3 bucket, set alert based on response status
        axios.get('http://localhost:5000/upload-photo')
        .then(() => {
            updateUploadState('success-upload');
        })
        .catch(() => {
            updateUploadState('danger-upload');
        });
    }

    // Render component
    return (
        <div className='upload-picture-page'>
            { uploadState === '' ? null : <Alert type={ uploadState } /> }
            <h1 style={{ marginTop: '2rem' }}>Upload Picture!</h1>
            <form onSubmit={ uploadPhotoHandler }>
                <button style={{ marginTop: '1rem' }} type="submit" className='btn btn-success'>Click to Upload Photo</button>
            </form>
        </div>
    )

}

export default UploadPicturePage;