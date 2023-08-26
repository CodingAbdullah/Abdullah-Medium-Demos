const Navbar = () => {

    return (
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <b><a class="navbar-brand" style={{ color: 'white' }} href="/">Number Converter</a></b>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" style={{ color: 'white' }} aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style={{ color: 'white' }} href="/number-conversion-page">Conversion</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;