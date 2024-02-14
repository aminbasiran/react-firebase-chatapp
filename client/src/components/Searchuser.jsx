import React from 'react'
import { SlMagnifier } from "react-icons/sl";

const Searchuser = () => {
    return (
        <div className='my-2 flex place-items-center justify-between border-b dark:border-zinc-700'>
            <input type="text" placeholder="Search" className='unset-all' />
            <div className='p-2 dark:text-white'>
                <SlMagnifier />
            </div>
        </div>
    )
}

export default Searchuser
