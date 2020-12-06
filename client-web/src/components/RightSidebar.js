import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import playlistIcon from '../icons/queue_music-24px.svg';

import '../styles/Sidebar.css';

export const RightSidebar = (props) => {

    const { user, auth, profile, currentRoom, history } = props;

    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/playlist/${currentRoom.id}`)
            .then(res => res.json())
            .then(res => setPlaylist(res))
    }, [currentRoom])
    // TODO: show thumbnail of who added track
    return (
        <div className="sidebar right">
            <img className="handle handle-right" src={ playlistIcon } alt="playlist" />
            <div className="playlist-display">
                { playlist.length > 0 &&
                    playlist.map( (track, key) => 
                        <div key={key}>
                            <img className="thumbnail" src={track.album.images[0].url} alt={`${track.album.name} cover`} />
                            <p><strong>{track.name}</strong> - {track.artists[0].name}</p>
                        </div>
                    )
                }
            </div>
            <button onClick={() => history.push({ pathname: "/add-track", state: { user, room: currentRoom, auth, profile }})} >
                <img src={ add } alt="add" />
            </button>
            <img src={ skip } alt="skip" />
        </div>
    )
}

