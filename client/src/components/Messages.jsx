import React from 'react'
import Message from "./Message"
import { useGlobalStore } from '../stateprovider/Context'


const Messages = () => {

    const {state} = useGlobalStore()

    return (
        <div className='grow h-4/5 mt-2 mr-2 overflow-scroll overflow-x-hidden hide-scrollbar '>
            {state.messages.map(msg => <Message key={msg.id} text={msg.data.text} isOwner={msg.data.uid} time={msg.data.timestamp} /> )}
        </div>
    )
}

export default Messages
