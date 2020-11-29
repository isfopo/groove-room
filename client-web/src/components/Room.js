import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

import '../styles/Room.css';

export const Room = (props) => {

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/profiles/${props.currentRoom.id}`)
            .then(res => res.json())
            .then(res => setProfiles(res))
    }, [props.currentRoom])

    return (
        <div className="room">
            {
                profiles.map( profile => 
                    <Profile key={profile.id} profile={profile} />
                )
            }
        </div>
    )
}
