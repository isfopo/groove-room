import React from 'react'
import add from '../icons/add-24px.svg';
import join from '../icons/group-24px.svg';

export const LeftSidebar = () => {

    // render all rooms a user in a part of "/users/rooms"

    return (
        <div className="left-sidebar">
            <a href="/join-room">
                <img src={ join } alt="join" />
            </a>
            <a href="/add-room">
                <img src={ add } alt="add" />
            </a>
        </div>
    )
}
