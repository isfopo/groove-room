import React, { useState } from 'react';
import queryString from 'query-string';

import more from '../icons/more_vert-24px.svg'

export const RoomLineItem = (props) => {

    const { room, profile, active } = props;
    
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`${active && "active"}`} onMouseLeave={() => setShowMenu(false)}>
            <p>{props.room.name}</p>
            { active &&
                <img onMouseEnter={() => setShowMenu(true)} src={ more } alt="more" />
            }

            { showMenu &&
                <div className='room-menu' >
                    <a href={`/invite/${queryString.stringify({
                        id: room.id,
                        name: room.name
                    })}`}>Invite</a><br />

                    <a href={`/rename/${queryString.stringify({
                        id: room.id,
                        name: room.name
                    })}`}>Rename</a><br />

                    <a href={`/leave/${queryString.stringify({
                        room_id: room.id,
                        room_name: room.name,
                        profile_id: profile.id
                    })}`}>Leave</a><br />

                    <a href={`/remove/${queryString.stringify({
                        room_id: room.id,
                        room_name: room.name,
                        profile_id: profile.id
                    })}`}>Remove</a>
                </div>
            }
        </div>
    )
}
