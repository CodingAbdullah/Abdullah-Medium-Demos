
const Navbar = () => {

    let linkStyle = { color: 'white' }; // Setting custom style for links
    
    return (
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container-fluid">
                <a style={ linkStyle } class="navbar-brand" href="/">API Documentation</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a style={ linkStyle } class="nav-link active" aria-current="page" href="/delete-post-page">Delete Post</a>
                        </li>
                        <li class="nav-item">
                            <a style={ linkStyle } class="nav-link active" aria-current="page" href="/get-post-page">Get Post</a>
                        </li>
                        <li class="nav-item">
                            <a style={ linkStyle } class="nav-link active" aria-current="page" href="/insert-post-page">Insert Post</a>
                        </li>
                        <li class="nav-item">
                            <a style={ linkStyle } class="nav-link active" aria-current="page" href="/update-post-page">Update Post</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;