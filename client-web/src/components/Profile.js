import React, { useState, useEffect } from 'react'

import {isEmpty} from '../utils/isEmpty.js' 

const SpotifyWebApi = require('spotify-web-api-js');

export const Profile = (props) => {

    const spotifyApi = new SpotifyWebApi();
    const { user, auth, room, profile } = props;

    const [readyToType, setReadyToType] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    const [listeningTo, setListeningTo] = useState({});

    const getLastMessage = () => {
        fetch(`http://localhost:3001/messages/last/${profile.id}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === 200)
            {
                setLastMessage(res.dataValues.content)
            } else {
                setReadyToType(true)
            } 
        })
    }

    const getTrackData = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.getTrack(profile.listening_to)
            .then(res => setListeningTo(res))
    }

    const playListeningTo = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.play({
            "uris": JSON.parse(room.playlist).map( track => track.uri ),
            "offset": {
                "uri": listeningTo.uri
            },
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/messages/create', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                profile_id: profile.id,
                content: newMessage
            })
        })

        setNewMessage('');
        setReadyToType(false);
    }

    useEffect(() => {
        const source = new EventSource(`http://localhost:3001/messages/update-profile/${profile.id}`);
        source.addEventListener('message', message => {
            console.log('Got:', message)
            getLastMessage();
        })
        
        return () => source.close()
    }, [])

    useEffect(() => {
        getLastMessage();
        getTrackData();
        playListeningTo();
    }, [room, profile, newMessage])

    // display listeningTo data
    
    return (
        <div className={`profile ${ profile.user_id === user.id && 'active'}`}>

            <div className="listening-to">
                { !isEmpty(listeningTo) &&
                    <>
                        <p>Listening to:</p>
                        <p>{listeningTo.name}</p>
                        <p>{listeningTo.artists[0].name}</p>
                        <img className="thumbnail" src={listeningTo.album.images[0].url} alt={listeningTo.artists[0].name} /> 
                    </>
                }
            </div>

            <img key={ profile.id } src={ profile.image } alt="profile" />


            <div className="tag" onMouseEnter={() => setReadyToType(true)} onMouseLeave={() => lastMessage && !newMessage && setReadyToType(false)}>
                { profile.user_id !== user.id || !readyToType ?
                    <p className="message">{lastMessage}</p>
                :
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="input"
                            type="text"
                            value={newMessage}
                            placeholder="Type a message..."
                            onChange={ e => {
                                if (e.target.value) {
                                    setNewMessage(e.target.value)
                                } else {
                                    setNewMessage(e.target.value)
                                    setReadyToType(false) } 
                                }
                            }
                        />
                    </form>
                }
            </div>
        </div>
    )
}
