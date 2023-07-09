import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';

const WelcomePage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (!user ){
            navigate("/");
        }
    }, []);

    return (
        <div className="welcome-page">
            <h1>Welcome!</h1>
            <p>Click the button to view content, or click the option in the navbar</p>
            <button style={{ marginTop: '2rem' }} className="btn btn-primary" onClick={() => navigate("/content")}>View Content</button>
        </div>
    )
}

export default WelcomePage;