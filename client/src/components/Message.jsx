import React from 'react'
import { useGlobalStore } from '../stateprovider/Context'

import { formatTimestampToTime } from "../utils/timestamp";


const Message = ({text,isOwner,time}) => {

    const {state} = useGlobalStore()
    
    return (
        <div className={`flex mb-2 ${ isOwner === state.currUser.uid ? ' flex-row-reverse ' : 'flex-row'}`}>
        {/* <div className={'flex mb-2 flex-row'}> */}
            <div className='aspect-square w-[35px] h-[35px] rounded-full bg-amber-200 ml-2'></div>
            <div className={` ml-2 font-medium mt-3 ${ isOwner === state.currUser.uid ? 'rounded-tl-md bg-sky-500 dark:bg-sky-500/20 text-white': 'rounded-tr-md bg-slate-200/60'} rounded-b-md text-xs  max-w-3xl px-2 py-1`}>
            {/* <div className='ml-2 font-medium mt-3 rounded-tl-md bg-sky-500/20 rounded-b-md text-xs max-w-3xl px-2 py-1'> */}
                <p className='break-text break-normal'>{text}</p>
                <p className='text-[9px] mt-2 text-end'>{formatTimestampToTime(time)}</p>
            </div>
        </div>
    )
}

export default Message
