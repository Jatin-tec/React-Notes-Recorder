import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation();

    const handelLogout = ()=>{
        localStorage.removeItem('auth');
    }

    useEffect(() => {

    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="d-flex">
                       {!localStorage.getItem('auth')?<Link to='/login' type="button" className="btn btn-primary mx-1">Login-Signup </Link>:<Link to='/login' type="button" onClick={handelLogout} className="btn btn-primary mx-1">Logout</Link>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
