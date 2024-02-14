import React from 'react'
import Individualuser from './Individualuser'
import {users} from "../seed/users"


const Chatlist = () => {
  return (
    <div className='flex-1 overflow-x-hidden hide-scrollbar'>
      {users.map(user => <Individualuser key={user.id} name={user.name} message={user.message} unread={user?.unread} profilePic={user?.profilePicture} time={user.time}/>)}
      
      
    </div>
  )
}

export default Chatlist
