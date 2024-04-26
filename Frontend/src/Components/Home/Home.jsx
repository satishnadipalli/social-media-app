import React, { useState } from 'react'
import "./Home.css"
import SIdeBar from '../SideBar/SIdeBar'
import AllChats from '../AllChats/AllChats'
import DisplayChat from '../DisplayChat/DisplayChat'
const Home = () => {
  const [user,setUser] = useState(false);
  const [clickedUser,setClickedUser] = useState(null);
  return (
    <div className='main-home-div'>
      <SIdeBar/>
      <AllChats setClickedUser={setClickedUser}/>
      { <DisplayChat clickedUser={clickedUser} />}
    </div>
  )
}

export default Home;
