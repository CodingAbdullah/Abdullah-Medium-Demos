// Custom Navbar component 
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">AG Grid Demo</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a style={{ color: 'black' }} className="nav-link active" aria-current="page" href="/table">Table</a>
                        </li>
                        <li class="nav-item">
                            <a style={{ color: 'black' }} className="nav-link" href="/chart">Chart</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;