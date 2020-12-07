import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';

import '../styles/Room.css';
import { Message } from './Message';
import { isEmpty } from '../utils/isEmpty';

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

    const sync = async () => {
        await spotifyApi.setAccessToken(auth.access_token);

        const player = await spotifyApi.getMyCurrentPlaybackState();

        fetch('http://localhost:3001/rooms/sync', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                room_id: room.id,
                current_uri: player.item.uri,
                position_ms: player.progress_ms
            })
        })

    }

    const play = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        // FIXME: spotify has to be playing for this to work - is there a way to start/open spotify from here?
            // spotify is looking for active devices - if there are none then there is a 404 code returned
                // active devices can be called for
                // maybe if we get a 404 error then prompt user to open spotify? 

        fetch(`http://localhost:3001/rooms/sync/${room.id}`)
            .then(res => res.json())
            .then(res => {
                if ( res.status === 200 ) {
                    spotifyApi.play({
                        "uris": JSON.parse(room.playlist).map( track => track.uri ),
                        "offset": {
                            "uri": res.current_uri
                        },
                        "position_ms": res.position_ms
                    });
                } else if ( res.status === 404) {
                    spotifyApi.play({
                        "uris": JSON.parse(room.playlist).map( track => track.uri )
                    });
                }
            })
    }

    const pause = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.pause()
    }
    
    useEffect( () => {
        if ( !isEmpty(room) && room.playlist ) {
            play();
        } else {
            pause();
        }
    }, [room])

    return (
        <div className="room">
            <button onClick={() => sync()} >sync</button>
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
