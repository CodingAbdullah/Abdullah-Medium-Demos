import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducers/authReducer';

const LogoutPage = () => {
    // Check the global state, check to see if User exists
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate("/");
    const dispatch = useDispatch();

    // Check to see if the user is actually logged in
    useEffect(() => {
        if (!user || !token){
            navigate("/");
        }
        else {
            dispatch(logout()); // Dispatch logout action
        }
    }, []);

    if ( user && token ){
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="logout-page">
                <h1>You have been logged off!</h1>
                <button className="btn btn-primary">Go Home</button>
            </div>
        )
    }
}

export default LogoutPage;