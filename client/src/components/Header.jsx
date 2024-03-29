import React from 'react'
import { Link,Outlet } from 'react-router-dom'

const Header = () => {
    return (

        <>
            <ul>
                <li><Link to="register">Register</Link></li>
                <li><Link to="login">Login</Link></li>
                <li><Link to="home">Home</Link></li>
                <li><Link to="settings">Settings</Link></li>
            </ul>
                
            <Outlet/>
            
        </>
    )
}

export default Header
