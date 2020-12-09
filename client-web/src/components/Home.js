import React, { useState } from 'react';

import { Login } from './Login.js';
import { Room } from './Room.js';
import { LeftSidebar } from './LeftSidebar.js';
import { RightSidebar } from './RightSidebar.js';

import { isEmpty } from '../utils/isEmpty.js';

import '../styles/Home.css';

import logout from '../icons/logout.svg'

export const Home = (props) => {

    const { user, auth, history, location } = props;

    const [room, setRoom] = useState(() => location.state ? location.state.room : {});
    const [profile, setProfile] = useState({});
    
    const getRoom = id => {
        fetch(`http://localhost:3001/${id}`)
            .then(res => res.json())
            .then(res => setRoom(res))
    }

    const handleSetRoom = (newRoom) => {
        setRoom(newRoom)
    }

    const handleSetProfile = (profile) => {
        setProfile(profile);
    }

    const handleLogOut = () => { // TODO: handle logout
        history.push('/log-out')
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
                        room={room}
                        setRoom={handleSetRoom}
                        getRoom={getRoom}
                        profile={profile}
                    />
                    <Room 
                        user={user}
                        auth={auth}
                        room={room}
                        profile={profile}
                        setProfile={handleSetProfile}
                    />
                    <RightSidebar 
                        user={user}
                        auth={auth}
                        room={room}
                        profile={profile}
                        history={history}
                    />
                    <button className='logout' onClick={handleLogOut}>
                        <img src={logout} alt='logout' />
                    </button>
                </>
            }
        </div>
    )
}
