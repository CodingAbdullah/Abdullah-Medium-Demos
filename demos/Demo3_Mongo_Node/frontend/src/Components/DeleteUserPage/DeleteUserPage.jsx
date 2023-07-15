import { useState } from 'react';
import axios from 'axios';

const DeleteUserPage = () => {
    const [objectID, updateObjectID] = useState("");

    const formHandler = e => {
        e.preventDefault();

        // Will be ompleted soon..
    }

    return (
        <div className="delete-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Delete User</b></h1>
            <form onSubmit={ formHandler } style={{ marginTop: '1.5rem', padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>Object ID</b></label>
                    <input onChange={ e => updateObjectID(e.target.value) } type="text" className="form-control" required />
                    <div className="form-text" style={{ color: 'black' }}><i>The MongoDB object ID of the User object</i></div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeleteUserPage;