import { FC } from 'react';
import { useNavigate } from 'react-router';

const HomePage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            <h1 style={{ marginTop: '1rem' }}>Home Page of the Mocha.js/React Test Application!</h1>
            <button style={{ marginTop: '1rem' }} className='btn btn-success' onClick={() => navigate("/search")}>Search!</button>
        </div>
    )
}

export default HomePage;