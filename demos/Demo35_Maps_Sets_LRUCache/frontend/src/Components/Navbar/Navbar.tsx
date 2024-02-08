import { FC } from 'react';

// Navbar for To Do List Application
const Navbar: FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-teritary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">To Do List Tracker</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/to-list">To Do List</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;