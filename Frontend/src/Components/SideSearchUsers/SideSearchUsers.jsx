import React, { useState } from 'react';
import "./SideSearchUsers.css";
import { useSelector } from 'react-redux';
import { getUserName } from '../../utils/functions';

const SideSearchUsers = ({ isOpenSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [globalUsers, setGlobalUsers] = useState(null);
  const { userCredentials } = useSelector(state => state.messages);

  async function fetchGlobalChats() {
    try {
      const response = await fetch(`http://localhost:9000/user/allusers/?searchData=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userCredentials?.token}`
        }
      });

      if (response.ok) {
        const { Users } = await response.json();
        setGlobalUsers(Users); // Corrected state update
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createChat(id){
    try {
        const response = await fetch(`http://localhost:9000/api/access-chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userCredentials?.token}`
          },
          body:JSON.stringify({userId:id})
        });
  
        if (response.ok) {
          const  data = await response.json();
          // console.log(data)
        }
      } catch (error) {
        console.log(error);
      }
  }

  // console.log(globalUsers);

  return (
    <div className={`searchUsers ${isOpenSearch ? "notSearchUsers" : ""}`}>
      <p style={{ fontWeight: 500, marginTop: "14px", fontSize: "17px" }}>Search for the global User</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}>
        <input
          className='search-for-user'
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className='search-button' onClick={fetchGlobalChats}>Search</button>
      </div>
      <div className='matching-users'>
        {
          globalUsers && globalUsers.map((chat, index) => ( // Added parentheses and index for the key
            <div onClick={()=>createChat(chat._id)} className='single-chat' key={index}>
              <div className='profile-photo-div'>
                <img
                  className='profile-photo'
                  src={"https://th.bing.com/th?id=OIP.6UhgwprABi3-dz8Qs85FvwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
                  alt=""
                />
              </div>
              {/* {console.log(chat,"here is you chat looking")} */}
              <div className='name-div'>
                <div className='one-div'>
                  <p className='group-name'>{chat.username}</p>
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
          ))
        }
      </div>
    </div>
  );
}

export default SideSearchUsers;
