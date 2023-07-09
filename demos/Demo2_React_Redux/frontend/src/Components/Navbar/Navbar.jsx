import { useSelector } from 'react-redux';

const Navbar = () => {

    const user = useSelector(state => state.auth.user); // Conditionally render Navbar on redux global state
    const token = useSelector(state => state.auth.token);

    // Styles for Navbar
    const styles = {
        navLinkColor: {
            color: 'white'
        },
        navTitleLinkAttributes : {
            color: 'white',
            fontWeight: 'bold'
        },
        buttonAttributes : {
            backgroundColor: 'white'
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a style={ styles.navLinkColor } className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    !user && !token ?
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a style={ styles.navLinkColor } className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" style={ styles.navLinkColor } href="/content">Content</a>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a style={ styles.navLinkColor } className="nav-link" href="/logout">Logout</a>
                                </li>
                                <li className="nav-item">
                                    <a style={ styles.navLinkColor } className="nav-link" href="/content">Content</a>
                                </li>
                            </ul>
                        </div>
                }
            </div>
        </nav>
    )
}

export default Navbar;