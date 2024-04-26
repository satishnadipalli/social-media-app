import React, { useEffect, useState } from 'react';
import "./AllCHats.css";
import { SearchIcon } from '../../HeroIcons';
import { data } from '../../data';
import { useDispatch, useSelector, } from 'react-redux';
import SideSearchUsers from '../SideSearchUsers/SideSearchUsers';
import { getUserName,getUserId } from '../../utils/functions';
import { setCurrentChat, setMessages } from '../../SliceFolder/MessageSlice';
import { fetchMessages } from '../../utils/fetch';
import {io} from "socket.io-client";


// const ENDPOINT = "http://localhost:9000";
// var socket,setectedChatCompare;

const AllChats = ({setClickedUser}) => {
  const {userCredentials,currentChat,UserMessages} = useSelector(state=>state.messages);
  const dispatch = useDispatch();
  const [allChats,setAllChats] = useState([]);
  const [isOpenSearch,setIsOpenSearch] = useState(false);

  // useEffect(()=>{
  //   socket= io(ENDPOINT);
  //   socket.emit("setup",userCredentials);
  //   socket.on("connection",()=>setSocketConnected(true));
  // },[]);


  async function handleClick(chat,clickedChat){
    dispatch(setCurrentChat(clickedChat));
    console.log("current current chat",currentChat);
    try {
        const response = await fetch("http://localhost:9000/api/access-chat",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userCredentials?.token}`
          },
          body:JSON.stringify({userId:chat})
        });
  
        if(response.ok){
          const data = await response.json();
          // socket.emit("join room",currentChat._id);
          fetchMessages(currentChat._id,dispatch,userCredentials);
        }
      } catch (error) {
        console.log(error);
      }

    // console.log(chat);

  }


  useEffect(()=>{
    const handleSubmit = async(event) =>{
        try {
          const response = await fetch("http://localhost:9000/api/getall-chats",{
            method:"GET",
            headers:{
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${userCredentials?.token}`
            }
          });
    
          if(response.ok){
            const data = await response.json();
            setAllChats(data)
            // console.log(data);
          }
        } catch (error) {
          console.log(error)
        }
    }
    
    handleSubmit();
  },[])
  return (
    <div className='all-chats-main-div'>
        <div className='inner-chats-div'>
            <div className='inner-inner-chats-div'>
                <div className='inner-all-chats-top'>
                    <div className='all-chats-top'>
                            <h2>Messages</h2>
                            <p>Messages, group messages</p>
                    </div>
                    <div className='outer-chat-search'>
                        <div className='chats-search-bar'>
                            <SearchIcon/>
                            <input className='search-bar' type="text" />
                        </div>
                    </div>
                </div>
                <div className='chats-names'>
                    {
                        allChats.map((chat)=>{
                            return(
                                <div onClick={()=>handleClick(getUserId(userCredentials._id,chat.users),chat)} className='single-chat'>
                                    <div className='profile-photo-div'>
                                        <img 
                                            className='profile-photo' 
                                            src={"https://th.bing.com/th?id=OIP.6UhgwprABi3-dz8Qs85FvwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"} alt="" 
                                        />
                                    </div>
                                    <div className='name-div'>
                                        <div className='one-div'> 
                                            <p className='group-name'>{getUserName(userCredentials._id,chat?.users)}</p>
                                            <p className='last-msg'>hi</p>
                                        </div>
                                        <div className='sec-div'>
                                            <div className='sec-div-one'>
                                                <span>22-11-2024</span>
                                            </div>
                                            <div className='sec-div-two'>
                                                <div className='totalmsg'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
            <div className='search-users-buton' onClick={()=>setIsOpenSearch(pre=>!pre)}> <SearchIcon/>Search Users</div>
        </div>
        {/* {<SideSearchUsers isOpenSearch={isOpenSearch}/>} */}
    </div>
  )
}

export default AllChats
