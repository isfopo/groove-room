import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';
import { useCookies } from 'react-cookie';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';

import '../styles/Room.css';

export const Room = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);

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

    const getAllMessages = () => {
        fetch(`http://localhost:3001/messages/room/${currentRoom.id}`)
            .then(res => res.json())
            .then(res => setMessages(res))
    }

    const more = () => {
        setExpanded(true);
        getAllMessages();
    } 

    const less = () => {
        setExpanded(false);
    }

    return (
        <div className="room">
            {
                profiles.map( profile => 
                    <Profile key={profile.id} profile={profile} />
                )
            }

            <div>
                { expanded ? // TODO: add all message display here
                    <img src={contract} alt="contract" onMouseEnter={less} />
                :
                    <img src={expand} alt="expand" onMouseEnter={more} />
                }
            </div>
        </div>
    )
}
