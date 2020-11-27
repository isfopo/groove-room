import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { Login } from './Login.js';

const SpotifyWebApi = require('spotify-web-api-js');

export const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['authorization-cookie']);

    const [token, setToken] = useState(cookies.spotify_auth.access_token)
    const [user, setUser] = useState({})
    
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
                .then(res => setUser(res[0]))
            })
    }, [token])

    const playSpotify = () => {

    }

    const handleLogOut = () => {
        setUser({});
    }


    return (
        <div>
            { !user.name ?
                <Login /> 
            :
                <>
                    <button onClick={playSpotify}>Play</button>
                    <p>{user.name}</p>
                    <button onClick={() => handleLogOut()}>Log Out</button>
                </>
            }
        </div>
    )
}
