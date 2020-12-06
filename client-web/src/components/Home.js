import React, { useState } from 'react';

import { Login } from './Login.js';
import { Room } from './Room.js';
import { LeftSidebar } from './LeftSidebar.js';
import { RightSidebar } from './RightSidebar.js';

import { isEmpty } from '../utils/isEmpty.js';

import '../styles/Home.css';

import logout from '../icons/logout.svg'

const SpotifyWebApi = require('spotify-web-api-js');

export const Home = (props) => {

    const spotifyApi = new SpotifyWebApi();
    
    const { user, auth, history } = props

    const [currentRoom, setCurrentRoom] = useState({});
    const [profile, setProfile] = useState({});
    
    const handleSetProfile = (profile) => {
        setProfile(profile);
    }
        
    const play = () => {
        spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.play({
            "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"],
            "position_ms": 80000
        })
    }

    const handleLogOut = () => { // TODO: handle logout
        history.push('/log-out')
    }

    const handleSetCurrentRoom = (room) => {
        setCurrentRoom(room)
    }

    return (
        <div>
            { isEmpty(user) ?
                <>
                    <h1>Groove Room</h1>
                    <Login /> 
                </>
            :
                <>
                    <LeftSidebar 
                        user={user}
                        history={history}
                        currentRoom={currentRoom}
                        setCurrentRoom={handleSetCurrentRoom}
                        profile={profile}
                    />
                    <Room 
                        user={user}
                        room={currentRoom}
                        profile={profile}
                        setProfile={handleSetProfile}
                    />
                    <button onClick={play}>Play</button>
                    <RightSidebar 
                        user={user}
                        auth={auth}
                        profile={profile}
                        history={history}
                        currentRoom={currentRoom}
                    />
                    <button className='logout' onClick={handleLogOut}>
                        <img src={logout} alt='logout' />
                    </button>
                </>
            }
        </div>
    )
}
