import React ,{useEffect} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Header from "./components/Header"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Requireauth from "./protected/Requireauth"
import { onAuthStateChanged } from 'firebase/auth';
import { auth,fireDB } from './firebase';
import { useGlobalStore } from './stateprovider/Context';
import { collection,onSnapshot,orderBy,query } from "firebase/firestore";


function App() {

    const {dispatch,actionTypes} = useGlobalStore()

    useEffect(()=>{
        const querySnapshot  = query(collection(fireDB, "messages"), orderBy("timestamp"))
        const unsubscribe = onSnapshot(querySnapshot , snapshot => {
            const messagesArray = snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
                )
            )
                
            dispatch({type:actionTypes.ADD_NEW_MESSAGE, payload:messagesArray})
            })

        return unsubscribe
    },[])


    useEffect(()=>{  
        const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
        document.documentElement.classList.toggle('dark', isDarkMode);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    console.log('User account was just created (registered).');
                    // Perform actions specific to registration
                } 
                
                else {
                    dispatch({type:actionTypes.LOGIN_USER})
                    dispatch({type:actionTypes.SET_USER,payload:user})
                    console.log("a user has signed in",user.displayName)
                    // Perform actions specific to login
                }
            }
                
            else {
                console.log('User is logged out!');
                // dispatch({type:actionTypes.LOGOUT_USER})
                dispatch({type:actionTypes.SET_USER,payload:null})
            }
        })

        return () => unsubscribe()
    },[auth])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={ <Header/>}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Requireauth>
                    <Home/>
                </Requireauth>}/>
                <Route path="settings" element={<Requireauth>
                    <Settings/>
                </Requireauth>}/>
            </Route>
        )
    );

    return (
    <>
            <RouterProvider router={router}/>
    </>
    );
}

export default App;