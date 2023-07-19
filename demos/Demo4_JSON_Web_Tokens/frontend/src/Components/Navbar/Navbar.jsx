import { useSelector } from "react-redux";

const Navbar = () => {
    const tokenValue = useSelector(state => state.auth.token); // Using global store for conditional rendering

    // Wrapping Bootstrap Navbar into a React Component
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">User Posts Site</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    {
                        !tokenValue ? 
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link" aria-current="page" href="/register-user">Register User</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link" href="/login-user">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link-disabled" href="/create-post">Create Post</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link-disabled" href="/view-posts">View My Posts</a>
                                </li>
                            </ul>
                        :
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link-disabled" aria-current="page" href="/register-user">Register User</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link" href="/logout-user">Logout</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link" href="/create-post">Create Post</a>
                                </li>
                                <li class="nav-item">
                                    <a style={{ color: 'white' }} class="nav-link" href="/view-posts">View My Posts</a>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;