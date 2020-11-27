import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { Login } from './Login.js';

export const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['authorization-cookie']);

    const [token, setToken] = useState(cookies.spotify_auth)
    
    useEffect(() => {
        console.log(token)
    }, [])


    return (
        <div>
            <h1>Home</h1>
            <Login />
        </div>
    )
}
