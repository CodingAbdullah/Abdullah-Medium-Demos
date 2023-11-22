
// Bootstrap Navbar component wrapped into a custom component
const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a style={{ padding: '1rem' }} className="navbar-brand" href="/">React-Node.js-AWS S3 Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/upload-photo">Upload Picture</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/delete-photo">Delete Picture</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar;