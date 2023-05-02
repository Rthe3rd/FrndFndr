import React from 'react'
import { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"

const ChatPage = ({ socket }) => {

    const [messages, setMessage] = useState([])
    const [typingStatus, setTypingStatus] = useState('')
    const lastMessageRef = useRef(null)

    useEffect(() => {
        socket.on('messageResponse', data => setMessage([...messages, data]))
    }, [socket, messages]);

    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior:'smooth'})
    }, [messages])

    return (
        <div className = "chat">
            {/* <ChatBar socket = {socket}/> */}
            <div className = "chat__main">
                <ChatBody messages = {messages} typingStatus = {typingStatus} lastMessageRef = {lastMessageRef}/>
                <ChatFooter socket = {socket}/>
            </div>
        </div>
        )
    }

export default ChatPage