import React from 'react'
import { Navigate } from "react-router-dom";
import { useGlobalStore } from '../stateprovider/Context';
import { useLocation } from 'react-router-dom'

const Requireauth = ({children}) => {

    const {state} = useGlobalStore()
    const {pathname} = useLocation();

    return (
        <>
            {state.isLoggedIn ? children : <Navigate to="/login" replace={true} state={{path:pathname}} /> }
        </>
    )
    }

    export default Requireauth
