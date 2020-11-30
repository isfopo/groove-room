import React, { useState } from 'react';
import queryString from 'query-string';

import more from '../icons/more_vert-24px.svg'

export const RoomLineItem = (props) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div onMouseLeave={() => setShowMenu(false)}>
            <p>{props.room.name}</p>
            <img onMouseEnter={() => setShowMenu(true)} src={ more } alt="more" />

            { showMenu &&
                <div className='room-menu' >
                    <a href={`/invite/${queryString.stringify(props.room)}`}>Invite</a><br />
                    <a href={`/rename/${queryString.stringify(props.room)}`}>Rename</a><br />
                    <a href={`/leave/${queryString.stringify(props.room)}`}>Leave</a><br />
                    <a href={`/remove/${queryString.stringify(props.room)}`}>Remove</a>
                </div>
            }
        </div>
    )
}
