
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a style={{ color: 'white', fontWeight: 'bold', padding: '1rem' }} className="navbar-brand" href="/">AWS DocDB React-Node</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" href="#/insert-user">Insert User</a>
                    </li>
                    <li className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" href="#/read-user">Read User</a>
                    </li>
                    <li className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" href="#/delete-user">Delete User</a>
                    </li>
                    <li className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" href="#/update-user">Update User</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;