import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ChatHome = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userName.length == 0){
            localStorage.setItem('userName', 'Guest User');
            socket.emit("newUser", {userName, socketID : socket.id})
            navigate('/main')
        }
        else{
            localStorage.setItem('userName', userName);
            socket.emit("newUser", {userName, socketID : socket.id})
            navigate('/main')
        }
    };

    return (
        
        <div className = "d-flex">
            <div className = "col-8 loginPageLeft d-flex align-items-center">
                <div>
                    <div className = "d-block loginPageLeftBigText">FrndFndr</div>
                    <div className = "d-flex justify-content-end">
                        <div className = "d-block col-7 loginPageLeftSmallText">Helping people connect with their future best friend</div>
                    </div>
                </div>
            </div>
            <div className = "col-4 loginPageRight">
                <div className = "login-form-container">
                    <div className = "home__container">
                        <form onSubmit = {handleSubmit}>
                            <h2 className = "home__header"> Login </h2>
                            <label htmlFor =  "username">  </label>
                            <input
                                type = "text"
                                minLength = {6}
                                name = "username"
                                id = "username"
                                className = "username__input form-control"
                                placeholder='Enter a user name...'
                                value = {userName}
                                onChange = {(event) => setUserName(event.target.value)}
                                />
                                <div className = "login-buttons">                                
                                    <button className = "btn signIn ">Sign in</button>
                                    <button className = "btn signIn">Continue as guest</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHome;