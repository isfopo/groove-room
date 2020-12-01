import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { RoomLineItem } from './RoomLineItem';

import add from '../icons/add-24px.svg';
import join from '../icons/group-24px.svg';
import list from '../icons/list-24px.svg';

import '../styles/Sidebar.css';

export const LeftSidebar = (props) => {
    
    const [activeRooms, setActiveRooms] = useState([]);

    const [cookies] = useCookies();

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/user/${cookies.user.id}`)
            .then(res => res.json())
            .then(res => setActiveRooms(res))
    }, [cookies.user.id])

    return (
        <div className="sidebar left">

            <div className='room-display' >
                {
                    activeRooms.map( room => 
                    <div 
                        key={room.id} 
                        className={`room-line-item`}
                        onClick={() => props.setCurrentRoom(room)}
                    >
                        <RoomLineItem room={room} profile={props.profile} active={room === props.currentRoom}/>
                    </div>
                    )
                }
            </div>
            <a href="/join-room">
                <img src={ join } alt="join" />
            </a>
            <a href="/add-room">
                <img src={ add } alt="add" />
            </a>
            <img className="handle handle-left" src={ list } alt="list" />
        </div>
    )
}
