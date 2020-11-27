import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { Login } from './Login.js';
import { LeftSidebar } from './LeftSidebar.js';
import { RightSidebar } from './RightSidebar.js';

const SpotifyWebApi = require('spotify-web-api-js');

export const Home = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [token, setToken] = useState(cookies.spotify_auth.access_token)
    
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);
        spotifyApi.getMe()
            .then( async (data) => {
                fetch('http://localhost:3001/users', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => setCookie("user", res[0]))
            })
    }, [token])


    return (
        <div>
            { !cookies.user ?
                <Login /> 
            :
                <>
                    <p>{cookies.user.name}</p>
                    <LeftSidebar />
                    <RightSidebar />
                    <button onClick={() => props.history.push('/log-out')}>Log Out</button>
                </>
            }
        </div>
    )
}
