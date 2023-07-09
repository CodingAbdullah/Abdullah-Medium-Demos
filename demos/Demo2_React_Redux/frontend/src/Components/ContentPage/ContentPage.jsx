import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'; 

const ContentPage = () => {
    // Check global state, extract email
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token){
            navigate("/");
        }
    }, []);

    return (
        <div className="content-page">
            <h1>Hey, { user.email }, this is a hidden page! </h1>
        </div>
    )
}

export default ContentPage;