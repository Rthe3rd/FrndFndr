const express = require('express');
const app = express();
const cors = require('cors')
require('./config/mongoose.config')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
require('./routes/HandShake.routes')(app);
var time = new Date()
time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
let users = []

// Tell server to "listen" (make connection to) port, hardcoded here as 8000
const server = app.listen(8000, () => console.log('the server is fired up on port 8000'))

// socket variable
const io = require('socket.io')(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET" , "POST"],
    }
})

//io.on('connection') -> establishes the connection between react app (3000) and express server (8000) then creates a unique ID for each socket
io.on("connection", (socket) => {
    console.log(`Nice to meet you! (shake hand with ${socket.id})`)

    socket.on("join_room", (data) => {
        console.log("JOIN ROOM:", data)
        socket.join(data)
    })


    // Listens for the "message" event from the client side
    // The data object from the "message" event is emitted to all the users on the server using/through the "messageResponse" event
    socket.on('message', (data) => {
        io.emit('messageResponse', data);
    });

    // Listens for the "typing" event from the client side
    // The data object from the "typing" event is emitted to all the users on the server using/through the "typingResponse" event
    socket.on('typing' , data => (
        io.emit("typingResponse", data)
    ))

    // Listens for the "newUser" event from the client side
    // pushes the data object from "newUser" even into users array
    // emits users array in the newUserResponse event
    socket.on('newUser' , data => {
        users.push(data)
        io.emit("newUserResponse", users)
    })

    socket.on('disconnect' , () => {
        console.log('A user disconnected')
    })


    socket.on("send_message" , (data) => {
        // broadcast to everyone on server the data passed from front end
        // to specify which room to emit to, socket.to(data.room) needs to be added
        // socket.broadcast.emit("recieve_message", data);
        data.socketId = socket.id
        data.timeStamp = time
        console.log("Send Message:", data)
        // socket.to(data.room).emit("receive_message", data);
        io.in(data.room).emit("receive_message", data);

        socket.on('disconnet', function() {
            console.log('user disconnected')
        })
    });
});