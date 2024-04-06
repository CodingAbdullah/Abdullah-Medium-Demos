import { FC } from 'react';

const Navbar: FC = () => {
    return (
        <nav style={{ marginLeft: '1rem' }} className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">POM and the Page Factory</a>
            <div className="collapse navbar-collapse" >
                <a className="nav-link" href="/search">Search</a>
            </div>
        </nav>
    )
}

export default Navbar;