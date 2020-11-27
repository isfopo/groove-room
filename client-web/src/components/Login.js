import React, { useState } from 'react'
const queryString = require('query-string');

export const Login = () => {

    const {
        REACT_APP_CLIENT_ID,
        REACT_APP_AUTHORIZE_URL,
        REACT_APP_REDIRECT_URL
    } = process.env;

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?` +
        queryString.stringify({
            client_id: REACT_APP_CLIENT_ID, 
            redirect_uri: REACT_APP_REDIRECT_URL,
            scope: 'streaming user-read-private user-read-email user-read-playback-position user-modify-playback-state',
            response_type: 'token',
            show_dialog: 'true'
        })
    };

    return (
        <div className="authorization">
            <button onClick={handleLogin}>
                Login to spotify
            </button>
        </div>
    )
}
