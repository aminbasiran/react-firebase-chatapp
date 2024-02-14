
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoIosAttach } from "react-icons/io";
import React, {useEffect} from "react";
import { fireDB } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalStore } from "../stateprovider/Context";

const Messageinput = () => {
  
  const {state} = useGlobalStore()


  const messageSchema = yup.object().shape({
    message:yup.string().required(),
  })

  const {register,handleSubmit,formState:{errors},reset } = useForm({
    resolver:yupResolver(messageSchema)
  })


  const handleSendMessage = async (newMessage) => {
    try {
      await addDoc(collection(fireDB, "messages"), {
        uid: state.currUser.uid,
        displayName: state.currUser.displayName,
        text: newMessage,
        timestamp: serverTimestamp()
      })    
    } 

    catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const onSubmit = (data) => {
    handleSendMessage(data.message)
    reset()
  }

  return (
    <div className='grow basis-[10%] grid place-items-center'>
      <div className='flex bg-slate-200 w-[98%] p-2 rounded-md justify-end'>
          <form onSubmit={handleSubmit(onSubmit)} className='mr-auto flex items-center '>
            <input className='unset-all flex items-center ' type="text" placeholder='Your message...' {...register("message")}/>
            <div onClick={()=>console.log("hello")}className='cursor-pointer text-lg flex items-center p-2 rounded-md'>
              <IoIosAttach />
            </div>
            <button type='submit' className='cursor-pointer text-lg flex items-center p-2 rounded-md'>
              <RiSendPlane2Fill/>
            </button>
          </form>
        </div>
      </div>
  )
}

export default Messageinput