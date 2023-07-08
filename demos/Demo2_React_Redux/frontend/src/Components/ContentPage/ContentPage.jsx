import { useSelector } from 'react-redux';

const ContentPage = () => {
    // Check global state, extract email
    const email = useSelector(state => state.auth.user.email);

    return (
        <div className="content-page">
            <h1>Hey, { email }, this is a hidden page! </h1>
        </div>
    )
}

export default ContentPage;