import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

export const DisplayProfiles = (props) => {

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/profiles/${props.currentRoom.id}`)
            .then(res => res.json())
            .then(res => setProfiles(res))
    }, [props.currentRoom])

    return (
        <div className="profile-display">
            {
                profiles.map( profile => 
                    <Profile key={profile.id} profile={profile} />
                )
            }
        </div>
    )
}
