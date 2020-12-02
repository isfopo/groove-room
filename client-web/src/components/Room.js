import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';
import { useCookies } from 'react-cookie';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';

import '../styles/Room.css';
import { Message } from './Message';

export const Room = (props) => {

    // TODO: start playing room's current song on spotify
        // fetch current song uri and position_ms from db

    const [expanded, setExpanded] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);

    const { currentRoom , setProfile } = props

    const [cookies] = useCookies();

    useEffect(() => {
        fetch(`http://localhost:3001/profiles/room/${currentRoom.id}`)
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

                { expanded ? 
                    <div className="expanded-view">
                        <img className="arrows contract" src={contract} alt="contract" onMouseEnter={less} />
                        <div className="all-messages">
                            {
                                messages.map( message => 
                                    <Message key={message.id} userProfile={props.profile} message={message} />
                                )
                            }
                        </div>
                    </div>
                :
                    <div className="regular-view">
                        {
                            profiles.map( profile => 
                                <Profile key={profile.id} profile={profile} />
                            )
                        }
                        <img className="arrows expand" src={expand} alt="expand" onMouseEnter={more} />
                    </div>
                }
        </div>
    )
}
