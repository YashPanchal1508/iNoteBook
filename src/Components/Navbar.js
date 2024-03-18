import { Button } from 'bootstrap';
import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }
    React.useEffect(() => {
        //    console.log(location.pathname);
   
    }, [location]);
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} to="/">Home <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                    </li>
                </ul>
            </div>
            {!localStorage.getItem('token') ? <form className="d-flex">
                <Link to="/login" class="btn btn-primary btn active mx-1" role="button" aria-pressed="true">Login</Link>
                <Link to="/signup" class="btn btn-primary btn active mx-1" role="button" aria-pressed="true">Signup</Link>
            </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
        </nav>
    )
}


export default Navbar
