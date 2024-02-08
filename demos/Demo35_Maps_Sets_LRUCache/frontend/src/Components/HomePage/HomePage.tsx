import { FC } from 'react';
import { useNavigate } from 'react-router';

const HomePage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            <h1>Welcome to the Task Assignment App!</h1>
            <button className='btn btn-success' onClick={ () => navigate("/to-list") }>Go To App</button>
        </div>
    )
}

export default HomePage;