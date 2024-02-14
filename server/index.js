const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const cors = require("cors")
const app = express()
const server = http.createServer(app)

app.use(cors())


const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{

    // Handle user
    socket.on('send_user', (userId) => {
        console.log(`User connected: ${socket.id} set as: ${userId.user}`);
        socket.broadcast.emit("received_user",userId)
    });


    // Handle sending message
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("received_message",data)
    })

})

server.listen(3000,()=>{
    console.log("server is running")
})