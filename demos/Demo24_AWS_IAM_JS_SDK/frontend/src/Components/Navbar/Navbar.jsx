
// Bootstrap Navbar component wrapped into a custom component
const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">React-Node.js-AWS S3 Demo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/upload-photo">Upload Picture</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/delete-photo">Delete Picture</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;