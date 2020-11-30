import React, { useState } from 'react';
import queryString from 'query-string';

import more from '../icons/more_vert-24px.svg'

export const RoomLineItem = (props) => {

    const { room, profile } = props;
    
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div onMouseLeave={() => setShowMenu(false)}>
            <p>{props.room.name}</p>
            <img onMouseEnter={() => setShowMenu(true)} src={ more } alt="more" />

            { showMenu &&
                <div className='room-menu' >
                    <a href={`/invite/${queryString.stringify(room)}`}>Invite</a><br />
                    <a href={`/rename/${queryString.stringify(room)}`}>Rename</a><br />
                    <a href={`/leave/${queryString.stringify({ room, profile})}`}>Leave</a><br />
                    <a href={`/remove/${queryString.stringify(room)}`}>Remove</a>
                </div>
            }
        </div>
    )
}
