import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';
import { useCookies } from 'react-cookie';

import '../styles/Room.css';

export const Room = (props) => {


    const [profiles, setProfiles] = useState([]);

    const { currentRoom , setProfile } = props

    const [cookies] = useCookies();

    useEffect(() => {
        fetch(`http://localhost:3001/profiles/${currentRoom.id}`)
            .then(res => res.json())
            .then(res => setProfiles(res))
    }, [currentRoom])
    
    useEffect(() => {
        const [ user_profile ] = profiles.filter(profile => profile.user_id === cookies.user.id)
        setProfile(user_profile);
    }, [setProfile, profiles, cookies.user.id])

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
