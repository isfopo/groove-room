import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';

import '../styles/Room.css';
import { Message } from './Message';

const SpotifyWebApi = require('spotify-web-api-js');

export const Room = (props) => {

    // TODO: start playing room's current song on spotify
        // fetch current song uri and position_ms from db

    const spotifyApi = new SpotifyWebApi();

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

    const play = () => {

        spotifyApi.setAccessToken(auth.access_token);
        // FIXME: spotify has to be playing for this to work - is there a way to start/open spotify from here?
        spotifyApi.play({
            "uris": JSON.parse(room.playlist).map( track => track.uri ),
            "position_ms": 0
        })
    }

    return (
        <div className="room">

                <button onClick={play}>Play</button>

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
