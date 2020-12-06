import React, { useState, useEffect } from 'react'

import { RoomLineItem } from './RoomLineItem';

import add from '../icons/add-24px.svg';
import join from '../icons/group-24px.svg';
import list from '../icons/list-24px.svg';

import '../styles/Sidebar.css';

export const LeftSidebar = (props) => {
    
    const { user, profile, currentRoom, setCurrentRoom, history } = props;
    const [ activeRooms, setActiveRooms ] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/user/${user.id}`)
            .then(res => res.json())
            .then(res => setActiveRooms(res))
    }, [user.id])

    return (
        <div className="sidebar left">

            <div className='room-display' >
                {
                    activeRooms.map( room => 
                    <div 
                        {...console.log(room)}
                        // key={room.id} 
                        className={`room-line-item`}
                        onClick={() => setCurrentRoom(room)}
                    >
                        <RoomLineItem 
                            user={user}
                            room={room} 
                            profile={profile} 
                            active={room === currentRoom} 
                            history={history} 
                        />
                    </div>
                    )
                }
            </div>
            <div>
                
            </div>
            <button onClick={() => history.push({ pathname: "/join-room", state: { user }})} >
                <img src={ join } alt="join" />
            </button>
            
            <button onClick={() => history.push({ pathname: "/add-room", state: { user }})} >
                <img src={ add } alt="add" />
            </button>
            <img className="handle handle-left" src={ list } alt="list" />
        </div>
    )
}
