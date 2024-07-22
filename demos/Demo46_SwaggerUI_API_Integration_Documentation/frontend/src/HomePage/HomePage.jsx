import { useNavigate } from "react-router";

const HomePage = () => {

    const navigate = useNavigate(); // Navigation hook

    return (
        <div className='home-page'>
            <h1 style={{ marginTop: '1rem' }}>Home Page</h1>
            <p><i>Welcome to API Documentation! Get started by submitting a post using the button below!</i></p>
            <button class="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate("/insert-post-page")}>Insert Post</button>
        </div>
    )
}

export default HomePage;