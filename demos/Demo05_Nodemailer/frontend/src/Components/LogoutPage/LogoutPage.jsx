import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducers/authReducer';

// Logout page wrapped into a React component
const LogoutPage = () => {
    const tokenValue = useSelector(state =>  state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenValue) {
            navigate("/");
        }
        else {
            // User already logged out, navigate to home screen
            dispatch(logout());        
        }
    }, []);

    return (
        <div className="logout-page">
            <h1 style={{ marginTop: '1rem' }}><b>User successfully logged out!</b></h1>
            <button style={{ marginTop: '1rem' }} className="btn btn-success" onClick={ () => navigate("/") }>Back to Home</button>
        </div>
    )
}

export default LogoutPage;