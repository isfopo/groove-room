import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import playlistIcon from '../icons/queue_music-24px.svg';

import '../styles/Sidebar.css';

export const RightSidebar = (props) => {

    const { currentRoom } = props;

    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/playlist/${currentRoom.id}`)
            .then(res => res.json())
            .then(res => setPlaylist(res))
    }, [currentRoom])

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
            <a href={`/add-track/${queryString.stringify({
                id: currentRoom.id
            })}`}>
                <img src={ add } alt="add" />
            </a>
            <img src={ skip } alt="skip" />
        </div>
    )
}

