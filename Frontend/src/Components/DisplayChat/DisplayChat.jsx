import React, { useEffect, useState } from 'react'
import "./DisplayChat.css"
import { Send } from '../../HeroIcons'
import { useDispatch, useSelector } from 'react-redux'
import { getUserId, getUserName } from '../../utils/functions'
import { fetchMessages } from '../../utils/fetch'
import {io} from "socket.io-client";
import { appendMessage } from '../../SliceFolder/MessageSlice'

// const ENDPOINT = "http://localhost:9000";
// var socket,setectedChatCompare;

const DisplayChat = () => {
  const {currentChat,userCredentials,UserMessages} = useSelector(state=>state.messages);
  const [content,setContent] = useState("");
  const [socketConnected,setSocketConnected] = useState(false);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   // Establish a socket connection when the component mounts
  //   socket = io(ENDPOINT);
    
  //   // Listen for "message received" event
  //   socket.on("message received", (newMessageReceived) => {
  //     console.log("New message received:", newMessageReceived);
  //     dispatch(appendMessage(newMessageReceived)); // Dispatch action to append the new message
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  async function handleSendMessage() {
    try {
      const response = await fetch("http://localhost:9000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userCredentials?.token}`
        },
        body: JSON.stringify({ content, chatId: currentChat._id })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Emit a "new message" event to the socket server
        // socket.emit("new message", data);

        // Fetch updated messages after sending the message
        fetchMessages(currentChat._id, dispatch, userCredentials);
      }
    } catch (error) {
      console.log(error);
    }
  }
 


  return (
    <div className='display-chat-main-div'>
      <nav className='display-nav-bar'>
        <div className='profile-div'>
            <img className='user-profile-photo' src={"https://th.bing.com/th?id=OIP.6UhgwprABi3-dz8Qs85FvwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"} alt="not found" />
        </div>
        <div className='user-info-div'>
          <h3>{getUserName(userCredentials._id,currentChat?.users)}</h3>
          <h4 className='user-status'>offline</h4>
        </div>
      </nav>
      <div style={{marginBottom:"100px"}} className='messagees-div'>
      <div style={{padding: "20px", paddingTop: "200px",marginBottom:"700px"}} className='inner-messagees-div'>
        {UserMessages && UserMessages.map((message) => {
          const isCurrentUser = message.sender._id === userCredentials._id; // Assuming you have a currentUser object with an id property
          const messageStyle = isCurrentUser ? { float: "right", backgroundColor: "#DCF8C6" } : { float: "left", backgroundColor: "#E5E5EA" };
          const containerStyle = isCurrentUser ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" };

          return (
            <div key={message._id} style={{ marginTop: "10px", ...containerStyle }} className='message-container'>
              <div style={{ ...messageStyle }} className='message'>
                <span>{message.content}</span>
              </div>
            </div>
          );
        })}
      </div> 
    </div>

      <div className='typing-bar-div'>
        <input 
          type="text" name="message" 
          placeholder='Enter your msg here.......' 
          className='input-msg'
          onChange={(event)=>setContent(event.target.value)}
        />
        <button onClick={handleSendMessage}><Send/></button>
      </div>
    </div>
  )
}

export default DisplayChat
