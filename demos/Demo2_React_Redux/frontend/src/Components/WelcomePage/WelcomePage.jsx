import { useNavigate } from "react-router";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-page">
            <h1>Welcome!</h1>
            <p>Click the button to view content, or click the option in the navbar</p>
            <button className="btn btn-primary" onClick={() => navigate("/content")}>View Content</button>
        </div>
    )
}

export default WelcomePage;