import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { Login } from './Login.js';

const SpotifyWebApi = require('spotify-web-api-js');

export const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['authorization-cookie']);

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
            },
            function (err) {
                console.error(err);
            }
          );
    }, [token])

    const playSpotify = () => {

    }


    return (
        <div>
            <Login />
            <button onClick={playSpotify}>Play</button>
        </div>
    )
}
