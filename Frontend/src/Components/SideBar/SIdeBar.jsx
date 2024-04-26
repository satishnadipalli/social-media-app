import React from 'react'
import "./SideBar.css";
import { ChatsIcon, PhoneCallIcon, VedioIcon } from '../../HeroIcons';
const SIdeBar = () => {
  return (
    <div className='main-nav-div'>
      <div className='inner-main-div'>
        <div className='icons-div'>
          <ChatsIcon/>
        </div>
        <div className='icons-div'>
          <PhoneCallIcon/>
        </div>
        <div className='icons-div'>
          <VedioIcon/>
        </div>
      </div>
    </div>
  )
}

export default SIdeBar
