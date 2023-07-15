import { useState } from 'react';
import axios from 'axios';

// Create User Page using state to keep track of form data
const CreateUserPage = () => {
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
            <h1 style={{ marginTop: '1.5rem' }}><b>Create User</b></h1>
            <p><i>Register a User</i></p>
            <form onSubmit={ formHandler } style={{ padding: '2.5rem', marginLeft: 'auto', marginRight: 'auto', width: '50%', backgroundColor: 'lightgrey' }}>
                <div class="mb-3">
                    <label className="form-label"><b>First Name</b></label>
                    <input onChange={ e => updateFirstName(e.target.value) } type="text" className="form-control" required />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Last Name</b></label>
                    <input onChange={ e => updateLastName(e.target.value) } type="text" className="form-control" required />
                </div>
                <div class="mb-3">
                    <label className="form-label"><b>Age</b></label>
                    <input onChange={ e => updateAge(e.target.value) } type="number" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label"><b>Email address</b></label>
                    <input onChange={ e => updateEmail(e.target.value) } type="email" class="form-control" required />
                    <div className="form-text" style={{ color: 'black' }}><i>We'll never share your email with anyone else.</i></div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateUserPage;