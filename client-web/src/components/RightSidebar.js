import React from 'react'

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import playlist from '../icons/queue_music-24px.svg';

import '../styles/Sidebar.css';

export const RightSidebar = () => {

    // TODO: Show list of songs in playlist

    return (
        <div className="sidebar right">
            <img className="handle handle-right" src={ playlist } alt="playlist" />
            <div className="playlist-display">

            </div>
            <a href="/add-track">
                <img src={ add } alt="add" />
            </a>
            <img src={ skip } alt="skip" />
        </div>
    )
}

