import React ,{useState} from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase"
import { useGlobalStore } from '../stateprovider/Context';
import { useNavigate, useLocation} from 'react-router-dom';


const Login = () => {
    
    // const { state } = useLocation();
    const {state, dispatch,actionTypes} = useGlobalStore()
    const navigate = useNavigate()
    const [isLoading,setIsloading] = useState(false)
    
    // YUP LOGIN SCHEMA
    const loginSchema = yup.object().shape({
        email:yup.string().email().required(),
        password:yup.string().min(4).max(10).required(),
    })


    // HANDLE USER LOG IN WITH FIREBASE
    const signInUserWithEmailAndPassword = async (auth,email, password) => {
        try {

            setIsloading(true)
            const userCredential = await signInWithEmailAndPassword(
                auth, // assuming you have 'app' initialized from the previous step
                email,
                password
            );

            const user = userCredential.user;
            if(user){

                // localStorage.setItem('isLoggedIn', state.isLoggedIn.toString());
                dispatch({type:actionTypes.LOGIN_USER}) 
                dispatch({type:actionTypes.SET_USER, payload:user})
                navigate(state?.path || "/home")
            }
            
            // You can do additional actions here, e.g., redirect the user or update the UI
        } 
            
        catch (error) {
            console.error('Error signing in, no associated acc:', error.message);
            // Handle error (e.g., display an error message to the user)
        }

        finally{
            setIsloading(false)
        }
    };

    // REACT HOOK FORM CONFIG AND INIT 
    const {register,handleSubmit,reset,formState:{errors}} = useForm({
        resolver: yupResolver(loginSchema),
    })
    

    // HANDLE LOGIN SUBMIT ONCLICK EVENT
    const onSubmit = (data) => {
        signInUserWithEmailAndPassword(auth,data.email,data.password)
        reset()
    }

    return (

        <div className='flex min-h-screen items-center justify-center'>
            <div className="bg-zinc-100	 p-5 relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
            <h4 className="text-center block font-sans text-3xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Log in
            </h4>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit(onSubmit)}>
                <input className="block p-3 w-full rounded-md mb-2" type="email" placeholder='enter email' autoComplete='current-email' {...register("email")}/>
                <p className='mb-2 text-red-500'>{errors.email && errors.email?.message}</p>
                <input className="block p-3 w-full rounded-md mb-2" type="password" placeholder='enter password' autoComplete='current-password' {...register("password")}/>
                <p className='mb-2 text-red-500'>{errors.password && errors.password?.message}</p>
                <button className="my-5 block middle none mx-auto center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type='submit'>{isLoading ? "Logging in..." : "Log in"}</button>
                <p className='text-center'>Don't have an account? <Link className="font-bold text-pink-500 transition-colors hover:text-blue-700" to="/register">Create account</Link></p>
            </form>
            </div>
        </div>
    )
}

export default Login
