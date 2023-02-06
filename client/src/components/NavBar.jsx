import {Link} from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios'


const NavBar = (props) => {

    const [show, setShow] = useState(false)

    return(
        <div>
            <div className = "navBarContainer">
                <div className = "d-flex heading justify-content-between">
                    <div> <Link to = "/"> Home</Link> | <Link to = "/" > Pets</Link> | <Link to = "/"> Shelters </Link> </div>
                    <div > Learn how you can make a difference in your community </div>
                </div>
                <div className = "navigationBar" style={{height: "35px", backgroundColor: "rgba(0,0,255,.1)" }}>
                    <div className = "col-3 navigationComponents vcenter smallFont" style={{backgroundColor: "#95bcf2"}}> <Link to = "/ChatPage">About Pet Adoption</Link></div>
                    <div className = "col-3 navigationComponents vcenter smallFont" style={{backgroundColor: "#75aaf3"}}> Dog Care </div>
                    <div className = "col-3 navigationComponents vcenter smallFont" style={{backgroundColor: "#4e94f4"}}> Cat Care </div>
                    <div className = "col-3 navigationComponents vcenter smallFont" style={{backgroundColor: "#0669f2"}}> Shelters & Rescues </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar