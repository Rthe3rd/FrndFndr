import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'
import NavBar from '../components/NavBar';
const socket = io.connect("http://localhost:8000")

const Chat = () => {

    // ========================== States ========================== //
    // Room state
    const [room, setRoom] = useState('')
    // Message States
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState([])
    const [allMessages, setAllMessages] = useState([])
    const [socketId, setSocketId] = useState('')

    // ========================== Listeners/Emiters ========================== //

    // Join a room method using data (emiter)
    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    // Send message (emiter)
    const sendMessage = () => {
        socket.emit("send_message", { message, room })
    };

    // When socket is updated, listen for data emitted from the backend (listener)
    useEffect(() => {
        console.log("UseEffect")
        socket.on("receive_message", (data) => {
            if (!socketId) {
                setSocketId(data.socketId)
            }
            setMessageReceived(data);
            setAllMessages(messageReceived => {
                return [...messageReceived, data]
            })
        });
    }, [socket]);

    return (
        <div>
            <div>
                <input placeholder='Room Number' onChange={(event) => { setRoom(event.target.value) }} />
                <button onClick={joinRoom}> Join Room </button>
            </div>
            <div>
                <input onChange={(event) => setMessage(event.target.value)} placeholder="message..." />
                <button onClick={() => { sendMessage() }}>Send Message</button>
            </div>
            <div style={{ overflow: "scroll", width: "50%", height: "250px", backgroundColor: "rgba(0,0,255,.1)" }}>
                {allMessages.map((index, i) => {
                    return (
                        <div>
                            {index.socketId == socketId
                                ?
                                <h5 key={i} > right: {index.message} {index.timeStamp} </h5>
                                :
                                <h5 key={i} > left: {index.message} <h6> {index.timeStamp} </h6> </h5>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Chat