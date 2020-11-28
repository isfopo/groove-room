import React from 'react'

import add from '../icons/playlist_add-24px.svg';
import skip from '../icons/skip_next-24px.svg';
import back from '../icons/arrow_forward_ios-24px.svg';

import '../styles/Sidebar.css';

export const RightSidebar = () => {
    return (
        <div className="sidebar right">
            <img src={ add } alt="add" />
            <img src={ skip } alt="skip" />
            <img src={ back } alt="back" />
        </div>
    )
}

