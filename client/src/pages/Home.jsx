// import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import io from "socket.io-client"
import Chatlist from "../components/Chatlist"
import Chatheader from "../components/Chatheader"
import Searchuser from '../components/Searchuser'
import Viewer from "../components/Viewer"
import Chatcategory from '../components/Chatcategory'

const Home = () => {

  return (
    <>
        <div className='w-full flex h-screen bg-zinc-100 dark:bg-dark'>
          <div className='flex flex-col border-r basis-1/4 p-3  dark:border-zinc-700'>
              <Chatheader/>
              <Searchuser/>
              <Chatcategory/>
              <Chatlist/>
          </div>
          <div className='basis-3/4 flex flex-col h-screen'>
            <Viewer/>
          </div>
        </div>
    </>
  )
}

export default Home
