import React, { useState } from 'react';
import queryString from 'query-string';

import more from '../icons/more_vert-24px.svg'

export const RoomLineItem = (props) => {

    const { user, room, profile, active, history } = props;
    
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`${active && "active"}`} onMouseLeave={() => setShowMenu(false)}>
            <p>{props.room.name}</p>
            { active &&
                <img onMouseEnter={() => setShowMenu(true)} src={ more } alt="more" />
            }

            { showMenu &&
                <div className='room-menu' >
                    <button onClick={() => history.push({ pathname: '/invite', state: { user, room }})}>
                        Invite
                    </button>
                    <br />

                    <button onClick={() => history.push({ pathname: '/rename', state: { user, room }})}>
                        Rename
                    </button>
                    <br />

                    <button onClick={() => history.push({ pathname: '/leave', state: { user, room, profile }})}>
                        Leave
                    </button>
                    <br />

                    <button onClick={() => history.push({ pathname: '/remove', state: { user, room }})}>
                        Remove
                    </button>
                </div>
            }
        </div>
    )
}
