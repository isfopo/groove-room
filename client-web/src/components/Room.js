import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';

import '../styles/Room.css';
import { Message } from './Message';

export const Room = (props) => {

    // TODO: start playing room's current song on spotify
        // fetch current song uri and position_ms from db

    const { user, auth, room, profile, setProfile } = props

    const [expanded, setExpanded] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3001/profiles/room/${room.id}`)
            .then(res => res.json())
            .then(res => setProfiles(res))
    }, [room])
    
    useEffect(() => {
        const [ user_profile ] = profiles.filter(profile => profile.user_id === user.id)
        setProfile(user_profile);
    }, [setProfile, profiles, user.id])

    const getAllMessages = () => {
        fetch(`http://localhost:3001/messages/room/${room.id}`)
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

                { expanded ? 
                    <div className="expanded-view">
                        <img className="arrows contract" src={contract} alt="contract" onMouseEnter={less} />
                        <div className="all-messages">
                            {
                                messages.map( message => 
                                    <Message key={message.id} userProfile={profile} message={message} />
                                )
                            }
                        </div>
                    </div>
                :
                    <div className="regular-view">
                        {
                            profiles.map( profile => 
                                <Profile key={profile.id} user={user} profile={profile} />
                            )
                        }
                        <img className="arrows expand" src={expand} alt="expand" onMouseEnter={more} />
                    </div>
                }
        </div>
    )
}
