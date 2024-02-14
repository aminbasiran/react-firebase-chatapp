import React , {useEffect} from 'react'
import { useGlobalStore } from '../stateprovider/Context'
import { signOut } from 'firebase/auth'
import {auth} from "../firebase"
import { GrPowerShutdown } from "react-icons/gr";
import { onAuthStateChanged } from 'firebase/auth';

const Chatheader = () => {
    
    const { state,dispatch,actionTypes} = useGlobalStore()

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({type:actionTypes.SET_USER,payload:user})
            }

            else {
                console.log('User is logged out!');
            }
        })

        return () => unsubscribe()
    },[])



    const handleSignout = async () => {
        try {
            const userCredential = signOut(auth)

            if(userCredential){
                dispatch({type: actionTypes.LOGOUT_USER})
            }
        } 
        
        catch (error) {
            console.log(error)
        }
    }

    return (
    <div className='flex justify-start'>
        <div className='w-[40px] aspect-square bg-amber-500 rounded-full'></div>
        <p className="ml-2 flex font-bold text-sm items-center dark:text-white">{state.currUser ? state.currUser.displayName : ""} (you)</p>
        <div className='text-sm ml-auto flex items-center'>
            <div onClick={handleSignout} className='p-2 rounded-md cursor-pointer bg-slate-200 hover:bg-slate-300'>
                <GrPowerShutdown/>
            </div>
        </div>
    </div>
    )
}

export default Chatheader
