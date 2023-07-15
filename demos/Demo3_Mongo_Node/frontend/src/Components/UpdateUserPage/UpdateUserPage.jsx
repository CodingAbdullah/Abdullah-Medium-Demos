import { useState } from 'react';
import axios from 'axios';

// Update User Page using state to keep track of data
const UpdateUserPage = () => {
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [age, updateAge] = useState(0);
    const [email, updateEmail] = useState("");

    const formHandler = e => {
        e.preventDefault();

        // Will be ompleted soon..

    }

    return (
        <div className="create-user-page">
            <h1 style={{ marginTop: '1.5rem' }}><b>Update User</b></h1>
            <p><i>Provide the email address of the User to update along with information to update</i></p>
            <form onSubmit={ formHandler } style={{ padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>First Name</b></label>
                    <input onChange={ e => updateFirstName(e.target.value) } type="text" className="form-control" />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Last Name</b></label>
                    <input onChange={ e => updateLastName(e.target.value) } type="text" className="form-control" />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Age</b></label>
                    <input onChange={ e => updateAge(e.target.value) } type="number" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label"><b><span style={{ color: 'red' }}>**REQUIRED**</span> -- Email address -- <span style={{ color: 'red' }}>**REQUIRED**</span></b></label>
                    <input onChange={ e => updateEmail(e.target.value) } type="email" class="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateUserPage;