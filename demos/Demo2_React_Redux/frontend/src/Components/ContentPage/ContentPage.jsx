import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'; 

const ContentPage = () => {
    // Check global state, extract email
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate("/");
        }
    }, []);

    if (user === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="content-page">
                <h1>Hey, { user.user.firstName + " " + user.user.lastName }, this is a hidden page! </h1>
                <button style={{ marginTop: '2rem' }} onClick={ () => navigate("/") }className="btn btn-primary">Go Back</button>
            </div>
        )
    }
}

export default ContentPage;