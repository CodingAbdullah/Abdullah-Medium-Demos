import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';

const LogoutPage = () => {
    // Check the global state, check to see if User exists
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate("/");
    const dispatch = useDispatch();

    // On component mount, evaluate
    useEffect(() => {
        if (user){
             // Dispatch actions to be added here...
        }
        else {
            navigate("/"); // User was never logged in
        }
    }, []);

    return (
        <div className="logout-page">
            <h1>You have been logged off!</h1>
        </div>
    )
}

export default LogoutPage;