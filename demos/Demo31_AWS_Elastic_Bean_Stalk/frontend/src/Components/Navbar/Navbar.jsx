// Navbar component
const Navbar = () => {

    // Wrapping Bootstrap Navbar into custom component
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a style={{ fontWeight:'bold', color: 'white' }} className="navbar-brand" href="/">React-Node Sequelize Demo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/create-user">Create User</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/update-user">Update User</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/read-user">Read User</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/delete-user">Delete User</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;