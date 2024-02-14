import React from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { useGlobalStore } from '../stateprovider/Context';


const Messagesinfo = () => {


    const handleToggleDark = () =>{
        document.documentElement.classList.toggle('dark'); 
        localStorage.setItem('darkMode', JSON.stringify(document.documentElement.classList.contains('dark')));
    }

    return (
        <div className='border-b  dark:border-zinc-700 flex justify-start flex-1 items-center gap-2 px-2 grow basis-[10%]'>
            <div className='aspect-square w-[35px] h-[35px] rounded-full bg-amber-200'></div>
            <div className=''>
                <h1 className='font-bold dark:text-white'>alia</h1>
                <h1 className='text-xs dark:text-white'>active now</h1>
            </div>
            <div className='ml-auto flex gap-3'>
                <div onClick={handleToggleDark} className='cursor-pointer dark:text-white'>
                    <IoMoonOutline />
                </div>
                <div className='cursor-pointer dark:text-white'>
                    <GoKebabHorizontal/>
                </div>
            </div>
        </div>
    )
}

export default Messagesinfo
