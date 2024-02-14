import React from 'react'

const Chatcategory = () => {
    return (
        <div className='flex flex-row gap-2 my-2'>
            <div className='bg-sky-500 font-bold text-sm rounded-md px-3 py-1 cursor-pointer'>All</div>
            <div className='text-gray-500 bg-slate-200 hover:bg-sky-500 hover:text-black transition-colors duration-300 font-semibold text-sm rounded-md px-3 py-1  cursor-pointer'>Unread</div>
            <div className='text-gray-500 bg-slate-200 hover:bg-sky-500 hover:text-black transition-colors duration-300 font-semibold  text-sm rounded-md px-3 py-1 cursor-pointer'>Archive</div>
            <div className='ml-auto text-gray-500 bg-slate-200 hover:bg-sky-500 hover:text-black transition-colors duration-300 font-extrabold text-sm   rounded-full px-3 py-1 cursor-pointer'>+</div>
        </div>
    )
}

export default Chatcategory
