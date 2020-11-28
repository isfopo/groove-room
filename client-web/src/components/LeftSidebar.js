import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import add from '../icons/add-24px.svg';
import join from '../icons/group-24px.svg';
import back from '../icons/arrow_back_ios-24px.svg';

import '../styles/Sidebar.css';

export const LeftSidebar = (props) => {

    const [activeRooms, setActiveRooms] = useState([]);

    const [cookies] = useCookies();

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/${cookies.user.id}`)
            .then(res => res.json())
            .then(res => setActiveRooms(res))
    }, [cookies.user.id])

    return (
        <div className="sidebar left">
            <div className='room-display' >
                {
                    activeRooms.map( room => 
                        <p 
                            key={room.id}
                            className={`room-name ${ room === props.currentRoom && 'active' }`}
                            onClick={() => props.setCurrentRoom(room)}
                        >{room.name}</p>
                    )
                }
            </div>
            <img src={ back } alt="back" />
            <a href="/join-room">
                <img src={ join } alt="join" />
            </a>
            <a href="/add-room">
                <img src={ add } alt="add" />
            </a>
        </div>
    )
}
