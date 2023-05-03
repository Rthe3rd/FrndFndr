import '../styles/Test.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = ({socket, token}) => {
    
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userName.length == 0){
            localStorage.setItem('userName', 'Guest User');
            socket.emit("newUser", {userName, socketID : socket.id})
            navigate('/landing')
        }
        else{
            localStorage.setItem('userName', userName);
            socket.emit("newUser", {userName, socketID : socket.id})
            navigate('/landing')
        }
    };

    useEffect(() => {
        axios.post(
            'https://api.petfinder.com/v2/oauth2/token',
            'grant_type=client_credentials&client_id=DQIKDmlCEqJgxmbVSeV9fjI3Lqja57S6014rEAkXcSNgZ7m2Ia&client_secret=yfqEgOtfa30PDQo3t16DdpgULiyCF0PoGxnAgvxY',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then((response) => {
            token(response.data.access_token)
            window.localStorage.setItem("API_TOKEN", JSON.stringify(response.data.access_token))
        })
        .catch((error) => {console.log(error)})
    }, [])



    return (
        <div className = "main-login-container">
            <div className = "left-login-container" >
                <div className = "left-text-main-container">
                    <div className = "main-logo-text" > FrndFndr</div>
                    <div className = "sub-logo-text" > Connecting people with their future best friend </div>
                </div>
            </div>
            <div className = "right-login-container">
                <div className = "login-continater" >
                    <form className = "login-card " onSubmit = {handleSubmit}>
                        <div className = "login-card-title" > Login</div>
                        <div className = "login-card-input-container" >
                            <input 
                            className = "form-control" 
                            placeholder = "Username..." 
                            type = "text"
                            minLength = {6}
                            name = "userName"
                            id = "userName"
                            value = {userName}
                            onChange = {(event) => setUserName(event.target.value)}
                            />
                            <div className = "login-card-buttons" > 
                                <button className = "sign-in-btn" >Sign-in</button>
                                <button className = "sign-in-btn" >Continue as guest</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 

export default Login