import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Components
import NavBar from './components/NavBar'
import ChatHome from './components/ChatHome'
import ChatPage from './components/ChatPage'
// Views
import Chat from './views/Chat'
import Main from './views/Main'
import SearchResults from './views/SearchResults'
// bring in socket for clients
import io from 'socket.io-client'


// CONNECT REACT APP TO SOCKET.IO SERVER
const socket = io.connect('http://localhost:8000')


function App() {

  const [token, setToken] = useState('')

  const handleToken = (token) => {
    setToken(token)
  }

  return (
    

    <div className="App">
      {/* <NavBar/> */}
      <Routes>
        <Route path = "/main" element = { <Main passToken = {token}/> } />
        <Route path = "/messenger" element = { <Chat/>} />
        <Route path = "/:animal/:locale/:token" element = { <SearchResults/> } />
        <Route path = "/" element = { <ChatHome socket = {socket}/>} />
        <Route path = "/ChatPage" element = { <ChatPage socket = {socket}/>} />
      </Routes>  
    </div>  

  );
}

export default App;
