
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a style={{ color: 'white', fontWeight: 'bold', padding: '1rem' }} className="navbar-brand" href="#/">AWS EC2 Demo</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" href="#/page-two">Page Two</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;