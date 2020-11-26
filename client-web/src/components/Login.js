import React, { useState } from 'react'

export const Login = () => {

    const [token, setToken] = useState('');
    const [resetToken, setResetToken] = useState('');

    const getSpotifyAuthorization = () => {
        fetch("http://localhost:3001/login/authorize")
            .then(res => res.json())
            .then(res => {
                console.log(res)
            }
        )
    }

    return (
        <div className="authorization">
            <button onClick={() => getSpotifyAuthorization()}>Sign in with Spotify</button>
        </div>
    )
}
