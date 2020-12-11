import React, {useState, useEffect} from 'react';

import { TrackLineItem } from './TrackLineItem'

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import playlistIcon from '../icons/queue_music-24px.svg';

import '../styles/Sidebar.css';

const SpotifyWebApi = require('spotify-web-api-js');

export const RightSidebar = (props) => {

    const spotifyApi = new SpotifyWebApi();

    const { user, auth, profile, room, history } = props;
    const [activeTrack, setActiveTrack] = useState({})

    // TODO: show thumbnail of who added track
    // TODO: implement skip vote
    // TODO: update active track when song is over
    // TODO: add color extraction - https://www.npmjs.com/package/react-color-extractor
    
    const updateActiveTrack = async () => {
        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                putListeningTo(res.item)
                setActiveTrack(res.item)
            })
    }

    /**
     * Adds listening_to to db
     * @param {Spotify Track Object} track track to put into listening in db
     */
    const putListeningTo = async (track) => {
        // use profiles/listening-to to update in db
        fetch('http://localhost:3001/profiles/listening-to', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                profile_id: profile.id,
                track_id: track.id
            })
        })
    }

    useEffect(() => {
        const trackListener = setInterval(() => {
            updateActiveTrack()
        }, 3000)
        return () => {
            clearInterval(trackListener)
        }
    }, [room])

    const handleSetActiveTrack = async (track) => {

        await spotifyApi.setAccessToken(auth.access_token);
        spotifyApi.play({
            "uris": JSON.parse(room.playlist).map( track => track.uri ),
            "offset": {
                "uri": track.uri
            },
        });

        putListeningTo(track)

        setActiveTrack(track)
    }

    return (
        <div className="sidebar right">
            <img className="handle handle-right" src={ playlistIcon } alt="playlist" />

            <div className="playlist-display">

                { room.playlist &&
                    JSON.parse(room.playlist).map( (track, key) => 
                        <TrackLineItem 
                            key={key}
                            track={track}
                            active={track.id === activeTrack.id}
                            setActiveTrack={handleSetActiveTrack}
                        />
                    )
                }

            </div>
            
            <button onClick={() => history.push({ pathname: "/add-track", state: { user, room, auth, profile }})} >
                <img src={ add } alt="add" />
            </button>
            <img src={ skip } alt="skip" />
        </div>
    )
}
