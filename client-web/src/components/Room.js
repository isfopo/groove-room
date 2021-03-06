import React, { useEffect, useState } from 'react'
import { Profile } from './Profile';

import expand from '../icons/expand_more-24px.svg';
import contract from '../icons/expand_less-24px.svg';
import back from "../icons/arrow_back_ios-24px.svg";

import '../styles/Room.css';
import { Message } from './Message';

const SpotifyWebApi = require('spotify-web-api-js');

export const Room = (props) => {

    const spotifyApi = new SpotifyWebApi();

    const { user, auth, room, profile, setProfile } = props

    const [expanded, setExpanded] = useState(false);
    const [isPrompted, setIsPrompted] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [devices, setDevices] = useState([]);

    const getProfiles = () => {
        fetch(`http://localhost:3001/profiles/room/${room.id}`)
            .then(res => res.json())
            .then(res => setProfiles(res))
    }

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

    const getDevices = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        
        const devicesResponse = Object.values(Object.values( await spotifyApi.getMyDevices())[0]);
        setDevices(devicesResponse);
        if ( !devicesResponse.map(device => device.is_active).includes(true)) {
            setIsPrompted(true)
        }
    }

    const handlePrompt = async (device) => {
        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.transferMyPlayback([device.id], {play: true})
        setIsPrompted(false);
    }

    const handleOpenWebPlayer = async () => {
        setTimeout( async () => {
            const devices = Object.values(Object.values( await spotifyApi.getMyDevices())[0]);

            if ( devices.filter(device => device.name.includes("Web Player")).length !== 0 ) {
                handlePrompt(devices.filter(device => device.name.includes("Web Player"))[0])
            } else {
                console.log('called again')
                handleOpenWebPlayer()
            }
        }, 1000)
    }
        
    useEffect(() => {
        const source = new EventSource(`http://localhost:3001/messages/update-room/${JSON.stringify(profiles.map(profile => profile.id))}`);
        source.addEventListener('message', message => {
            getAllMessages();
        })
        return () => source.close()
    }, [profiles])

    useEffect(() => {
        const [ user_profile ] = profiles.filter(profile => profile.user_id === user.id)
        setProfile(user_profile);
    }, [setProfile, profiles, user.id])

    useEffect( () => {
        getProfiles()
        getDevices()
        
        const source = new EventSource(`http://localhost:3001/rooms/update/${room.id}`);
        source.addEventListener('message', message => {
            console.log('Got:', message)
            getProfiles()
        })

        return () => {
            source.close()
        }
    }, [room]);

    // TODO: remind to add new track when on last track
    // FIXME: after returning from adding a new track, that new track is not added until a page refresh
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
                <>
                    { isPrompted ?
                        <div className="prompt">
                            <p>Which device would you like to listen on?</p>
                            {
                                devices.map( (device, key) => 
                                    <button key={key} onClick={() => handlePrompt(device)}>
                                        {device.name} - {device.type}
                                    </button>
                                )
                            }
                            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" onClick={() => handleOpenWebPlayer()}>
                                Open Spotify Web Player
                            </a>
                            <button onClick={() => setIsPrompted(false)}>
                                <img src={back} alt="back" />
                            </button>
                        </div>
                    :
                        devices.filter( device => device.is_active ).length > 0 &&
                            <div className="listening-on" onClick={() => setIsPrompted(true)}>
                                <p>Listening on {devices.filter(device => device.is_active)[0].name}</p> 
                            </div>
                    }
                    <div className="regular-view">
                        {
                            profiles.map( profile => 
                                <Profile key={profile.id} user={user} auth={auth} profile={profile} />
                            )
                        }
                        <img className="arrows expand" src={expand} alt="expand" onMouseEnter={more} />
                    </div>
                </>
            }
        </div>
    )
}
