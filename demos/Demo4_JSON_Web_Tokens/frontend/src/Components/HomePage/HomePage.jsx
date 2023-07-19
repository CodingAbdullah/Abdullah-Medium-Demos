import { useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            <h1><b>Welcome! Your Posts Await!!</b></h1>
            <button onClick={() => navigate("/register-user")}>Register User!</button>
        </div>
    )
}

export default HomePage;