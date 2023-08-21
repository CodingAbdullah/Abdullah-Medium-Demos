const Navbar = () => {
// Navbar for the main application
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a style={{ color: 'white' }} className="navbar-brand" href="/"><b>Expressless React Application</b></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" aria-current="page" href="/one-post-page">One Post</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/multiple-posts-page">Multiple Posts</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/bitcoin-data-page" >Bitcoin Data</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: 'white' }} className="nav-link" href="/multiple-coins-page">Multiple Coin Data</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;