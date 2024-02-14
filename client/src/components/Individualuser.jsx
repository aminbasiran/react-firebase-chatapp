import React from 'react'

const Individualuser = ({name,unread,message,time,profilePic}) => {
    return (
        <div className='flex p-2 rounded-lg hover:bg-slate-200 hover:dark:bg-sky-500/20 transition-colors duration-200 cursor-pointer'>
            {/* <div className=' w-[40px] h-[40px] aspect-square rounded-full bg-amber-200'></div> */}
            <img className=' w-[40px] h-[40px] aspect-square rounded-full ' src={profilePic} alt="" />
            <div className='ml-2 flex-1'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-sm font-semibold dark:text-white'>{name}</h1>
                    <h1 className='text-gray-500 text-xs font-semibold dark:text-white'>{time}</h1>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-sm max-w-40 overflow-hidden text-ellipsis whitespace-nowrap dark:text-white '>{message}</p>
                    <div className='text-xs px-2 font-medium rounded-md bg-red-600 text-white'>{unread && unread}</div>
                </div>
            </div>
        </div> 
    )
}


export default Individualuser
