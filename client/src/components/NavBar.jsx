import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "../styles/Navbar.css"


const NavBar = (props) => {

    const [show, setShow] = useState(false)

    return (
        <div className="">
            <div className="top-navbar-container">
                <div className="top-container-content">
                    <div> <Link to="/"> Home</Link> | <Link to="/" > Pets</Link> | <Link to="/"> Shelters </Link> </div>
                    <div > <Link to="/">Learn</Link> how you can make a difference in your community </div>
                </div>
            </div>
            <div className="bottom-navbar-container">
                <div className="bottom-container-content"> FrndFndr </div>
                <div className="mobile-navigation">
                    <ul className="hidden-links">
                        <li> Home</li>
                        <li> Shelters</li>
                        <li> Pets Near You</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar