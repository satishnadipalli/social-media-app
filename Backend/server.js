const express = require("express");
const  CONNECT_DB  = require("./db/connect");
const userRoutes = require("./Routes/UserRoutes");
const ChattingRoutes = require("./Routes/ChatRoutes");
require("express-async-errors");
const cors = require("cors");
const MessagingRouter = require("./Routes/MessageRoutes");
const { Socket } = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(ChattingRoutes);
app.use(MessagingRouter);


app.get("/",(req,res)=>{
    res.send(" we are successfully running");
})

const start = async (req,res) =>{
    try {

        
        CONNECT_DB();
        const server = app.listen(9000,()=>{
            console.log("the server is running");
        });
        
        const io = require("socket.io")(server,{
            pingTimeOut:60000,
            cors:{
                origin:"http://localhost:5173"
            }
        });

        io.on("connection",(socket)=>{
            console.log("connected to socket.io");

            socket.on("setup",(userData)=>{
                console.log("here is the usesr id",userData._id);
                socket.join(userData._id);
                socket.emit("the user is connected")
            })

            socket.on("join room",(roomId)=>{
                socket.join(roomId);
                console.log("the user joined the room",roomId);
            })

            socket.on("new message",(newMessageRecieved)=>{
                var chat = newMessageRecieved.chat;

                if(!chat.users) return console.log("chat.users are not defined");

                chat.users.forEach((user)=>{
                    if(user._id == newMessageRecieved.sender._id) return;

                    socket.in(user._id).emit("message recieved",newMessageRecieved)
                })
            })
        });

    } catch (error) {
        console.log("here is your error",error);
    }
}

start();