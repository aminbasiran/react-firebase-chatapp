import React , {useState} from 'react'
import * as yup from "yup"
import {Link} from "react-router-dom"
import {useForm,Controller} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword ,updateProfile  } from 'firebase/auth';
import {auth,fireDB} from "../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Register = () => {


    const [isLoading,setIsloading] = useState(false)

    // YUP SCHEMA VALIDATION
    const registerSchema = yup.object().shape({
        username:yup.string().required(),
        email:yup.string().email().required(),
        password:yup.string().min(4).max(12).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"),null],"password does not match").required("password confirmation is required"),
        agreeTerms: yup.boolean().oneOf([true],"Please agree to the terms")
    })

    // REACT HOOK FORM CONFIG AND INIT
    const {control,register,handleSubmit,formState: { errors }, reset} = useForm({
        resolver:yupResolver(registerSchema)
    })

    // HANDLE USER REGISTRATION AND KEEP IT IN FIRESTRORE

    const saveUserToFireStore = async(user) => {
        await addDoc(collection(fireDB, "users"), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            
        })
    }
    
    // HANDLE USER REGISTRATION WITH FIREBASE
    const registerUserWithEmailAndPassword = async (auth,email, password,displayName) => {
        try {
            setIsloading(true)

            const userCredential = await createUserWithEmailAndPassword(
                auth, // assuming you have 'app' initialized from the previous step
                email,
                password
            );

            const user = userCredential.user;

            if(user){
                console.log(user)
                await updateProfile(user, { displayName });
                saveUserToFireStore(user)
            }
            // You can do additional actions here, e.g., redirect the user or update the UI
        } 
        
        catch (error) {
            console.error('Error registering user:', error.message);
        // Handle error (e.g., display an error message to the user)
        }

        finally{
            setIsloading(false)
        }

    };

    

    // HANDLE REGISTER SUBMIT ONCLICK EVENT   
    const onSubmit = (data) =>{
        registerUserWithEmailAndPassword(auth,data.email,data.password,data.username)
        reset();
    }

    return (
        <>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='bg-zinc-100	 p-5 relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none'>
                    <h1 className='text-center block font-sans text-3xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>Register</h1>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                        <input className="block p-3 w-full rounded-md mb-2" type="text" placeholder='enter username' autoComplete="username" {...register("username")}/>
                        <p className='mb-2 text-red-500'>{errors.username && errors.username?.message}</p>
                        <input className="block p-3 w-full rounded-md mb-2" type="email" placeholder='enter email' autoComplete="email" {...register("email")}/>
                        <p className='mb-2 text-red-500'>{errors.email && errors.email?.message}</p>
                        <input className="block p-3 w-full rounded-md mb-2" type="password" placeholder='enter password' autoComplete="new-password" {...register("password")} />
                        <p className='mb-2 text-red-500'>{errors.password && errors.password?.message}</p>
                        <input className="block p-3 w-full rounded-md mb-2" type="password" placeholder='confirm password' autoComplete="confirm-password"  {...register("confirmPassword")} />
                        <p className='mb-2 text-red-500'>{errors.confirmPassword && errors.confirmPassword?.message}</p>
                        <div className='mb-2'>
                            <Controller
                                name="agreeTerms"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <>
                                        <input type="checkbox" {...field} />
                                        <span> I agree to the terms and conditions</span>
                                    </>
                                )}
                            />
                        </div>
                        <p className=' text-red-500'>{errors.agreeTerms && errors.agreeTerms?.message}</p>
                        <button className="my-5 block middle none mx-auto center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type='submit'>{isLoading ? "Registering..." : "Register"}</button>
                        <p className='text-center'>Already have and account? <Link className="font-bold text-pink-500 transition-colors hover:text-blue-700" to="/login">Sign in</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
