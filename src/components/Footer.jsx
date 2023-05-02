import { Link } from 'react-router-dom'
import '../styles/Footer.css'
import logo from '../images/logo.svg'
import logoD8D8E7 from '../images/logo-D8D8E7.svg'

const Footer = () => {
    return (
        <div className = "body">
            <div className = "top-container">
                <div className = "top-sub-contianer">
                    {/* <img src = {logoD8D8E7} alt="logo" className = "logo"></img> */}
                    <h5 className = "slogan">Your Friend, Our Passion</h5>
                </div>
            </div>

            {/* bottom container has 3 sub-containers/columns */}
            <div className = "main-footer-container">
                <h6 className = 'main-footer-container-logo'>FrndFndr</h6>
                <div className = "main-container">
                    {/* left sub-container */}
                    <div className ="main-sub-container">
                        <ul className='link-list'>
                            <li className = "footer-li"><Link to ="/" className= 'link'>ABOUT FRNDFNDR</Link></li>
                            <li className = "footer-li"><Link to ="/" className= 'link'>FRIEND ADOPTION</Link></li>
                            <li className = "footer-li"><Link to ="/" className= 'link'>PET CARE MATERIAL</Link></li>
                            <li className = "footer-li"><Link to ="/" className= 'link'>SITEMAP</Link></li>
                        </ul>
                    </div>
                    {/* min sub-container */}
                    <div className ="main-sub-container">
                    <ul className='link-list'>
                            <li className = "footer-li"><Link to ="/" className= 'link'> PRIVACY POLICY</Link></li>
                            <li className = "footer-li"><Link to ="/" className= 'link'> ABOUT OUR ADS</Link></li>
                            <li className = "footer-li"><Link to ="/" className= 'link'> ABOUT OUR PARTNERS</Link></li>
                        </ul>
                    </div>
                    {/* right sub-container */}
                    <div className ="main-sub-container">
                        <p className = "sign-up-text">Want to be the first to hear about our latest events and info? Register here!</p>
                        <button className = "sign-up-button"> SIGN UP</button>
                    </div>
                </div>
            </div>

            <div className='bottom-container'>
                <p className = "trademark">@2023 FRNDFNDR</p>
                <p className = "footer-notes">All content here is for demostrative purposes and in no way does the author claim ownership.  I hope you enjoy the demo and if you have any comments/questions/concerns, please reach out to me at...</p>
                <p className = "footer-icon"> icons created by Freepik - Flaticon</p>
            </div>
        </div>
    )
}

export default Footer