import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const HomePage = () => {
    const navigate = useNavigate();
    const tokenValue = useSelector(state => state.auth.token);

    return (
        <div className='home-page'>
            <h1 style={{ marginTop: '1rem' }}><b>Welcome! Your Posts Await!!</b></h1>
            {
                !tokenValue ?
                    <>
                        <p><i>Login or Register by clicking the button below!</i></p>
                        <button style={{ marginTop: '1rem' }} className='btn btn-primary' onClick={() => navigate("/register-user")}>Register User!</button>
                    </>
                    :
                    null
            }
        </div>
    )
}

export default HomePage;