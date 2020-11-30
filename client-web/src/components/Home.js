import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { Login } from './Login.js';
import { Room } from './Room.js';
import { LeftSidebar } from './LeftSidebar.js';
import { RightSidebar } from './RightSidebar.js';

const SpotifyWebApi = require('spotify-web-api-js');

export const Home = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [token, setToken] = useState(cookies.spotify_auth && cookies.spotify_auth.access_token); // TODO: get refresh token when needed
    const [currentRoom, setCurrentRoom] = useState({});
    const [profile, setProfile] = useState({});
    
    const handleSetProfile = (profile) => {
        setProfile(profile)
    }

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

    const handleLogOut = () => {
        removeCookie("user", {path: '/'});
        removeCookie("spotify_auth", {path: '/'});
        removeCookie("spotify_auth_state", {path: '/'});
        props.history.push('/log-out')
    }

    const handleSetCurrentRoom = (room) => {
        setCurrentRoom(room)
    }

    return (
        <div>
            { !cookies.user ?
                <>
                    <h1>Groove Room</h1>
                    <Login /> 
                </>
            :
                <>
                    <LeftSidebar 
                        currentRoom={currentRoom}
                        setCurrentRoom={handleSetCurrentRoom}
                        profile={profile}
                    />
                    <Room 
                        currentRoom={currentRoom}
                        profile={profile}
                        setProfile={handleSetProfile}
                    />
                    <RightSidebar />
                    <button onClick={handleLogOut}>Log Out</button>
                </>
            }
        </div>
    )
}
