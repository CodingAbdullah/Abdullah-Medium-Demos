// Bootstrap Navbar wrapped into a React component
const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" style={{ color: 'white' }} href="/"><b>User Portal</b></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" style={{ color: 'white' }} aria-current="page" href="/create-user">Create User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: 'white' }} href="/lookup-user">Lookup User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: 'white' }} href="/update-user">Update User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{ color: 'white' }} href="/delete-user">Delete User</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;