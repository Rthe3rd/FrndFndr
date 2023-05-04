import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Components
import NavBar from './components/NavBar'
import ChatHome from './components/ChatHome'
import ChatPage from './components/ChatPage'
// Views
import Chat from './views/Chat'
import Test from './views/Test'
import Landing from './views/Landing'
import Login from './views/Login'
import SearchResults from './views/SearchResults'
import QuickSearch from './views/QuickSearch'
// bring in socket for clients
import io from 'socket.io-client'


// CONNECT REACT APP TO SOCKET.IO SERVER
const socket = io.connect('http://localhost:8000')


function App() {

  const [token, setToken] = useState('')
  const [quickSearch, setQuickSearch] = useState('')


  return (
    

    <div className="App">
      <Routes>
        <Route path = "/" element = { <Login socket = {socket} token = {setToken} />} />
        {/* <Route path = "/Landing" element = { <Landing setQuickSearch = {setQuickSearch} quickSearch = {quickSearch} token = {token} />} /> */}
        <Route path = "/Landing" element = { <Landing />} />
        <Route path = "/messenger" element = { <Chat/>} />
        <Route path = "/:animal/:locale/:token" element = { <SearchResults/> } />
        <Route path = "/ChatHomeOld" element = { <ChatHome socket = {socket}/>} />
        <Route path = "/ChatPage" element = { <ChatPage socket = {socket}/>} />
        <Route path = "/test" element = { <Test />} />
        <Route path = '/:quickSearch' element = { <QuickSearch passToken = {token} quickSearch = {quickSearch}/>} />
      </Routes>  
    </div>  

  );
}

export default App;
