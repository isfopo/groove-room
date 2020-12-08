import React from 'react';

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import playlistIcon from '../icons/queue_music-24px.svg';

import '../styles/Sidebar.css';

export const RightSidebar = (props) => {

    const { user, auth, profile, room, history } = props;

    // TODO: show thumbnail of who added track
    // TODO: implement skip vote
    
    return (
        <div className="sidebar right">
            <img className="handle handle-right" src={ playlistIcon } alt="playlist" />

            <div className="playlist-display">
                { room.playlist &&
                    JSON.parse(room.playlist).map( (track, key) => 
                        <div key={key}>
                            <img className="thumbnail" src={track.album.images[0].url} alt={`${track.album.name} cover`} />
                            <p><strong>{track.name}</strong> - {track.artists[0].name}</p>
                        </div>
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

