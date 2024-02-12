import { FC } from 'react';

// Creating a custom Navbar component
const Navbar: FC = () => {
    return (
        <div className='navbar'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">LRU Cache Demo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/insert-task">Insert Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/delete-task">Delete Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/update-task">Update Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/view-tasks" aria-disabled="true">View Tasks</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;