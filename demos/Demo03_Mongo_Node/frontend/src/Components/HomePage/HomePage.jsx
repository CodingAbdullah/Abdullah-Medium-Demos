import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1 style={{ marginTop: '1.5rem' }}>Welcome to the User Portal</h1>
            <p><i>If you're new, create a new user</i></p>
            <button onClick={() => navigate("/create-user")} className="btn btn-primary">Create User</button>
        </div>
    )
}

export default HomePage;