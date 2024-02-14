import React from 'react'
import Messages from './Messages'
import Messagesinfo from './Messagesinfo'
import Messagesinput from './Messagesinput'

const Viewer = () => {
    return (
        
        <>
            {
                true ? 
                <>
                    <Messagesinfo/>
                    <Messages/>
                    <Messagesinput/>
                </> :
                <>
                    <div className='grid place-content-center h-full w-full'>
                        <h1 className='text-lg text-slate-400 font-bold'>No messages to show</h1>
                    </div>

                </>
            }

        </>
    )
}

export default Viewer
