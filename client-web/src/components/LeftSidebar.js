import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import add from '../icons/add-24px.svg';
import join from '../icons/group-24px.svg';

import '../styles/LeftSidebar.css';

export const LeftSidebar = (props) => {

    // render all rooms a user in a part of "/users/rooms"
    const [activeRooms, setActiveRooms] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        // fetch all rooms that the user is a part of and return them as an array
        fetch(`http://localhost:3001/rooms/${cookies.user.id}`)
            .then(res => res.json())
            .then(res => setActiveRooms(res))
    }, [cookies.user.id])

    return (
        <div className="left-sidebar">
            <div className='room-display' >
                {
                    activeRooms.map( room => 
                        <p 
                            className="room-name"
                            onClick={() => props.setCurrentRoom(room)}
                        >{room.name}</p>
                    )
                }
            </div>
            <a href="/join-room">
                <img src={ join } alt="join" />
            </a>
            <a href="/add-room">
                <img src={ add } alt="add" />
            </a>
        </div>
    )
}
