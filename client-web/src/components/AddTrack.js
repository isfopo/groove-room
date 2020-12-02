import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import back from '../icons/arrow_back_ios-24px.svg';

const SpotifyWebApi = require('spotify-web-api-js');

export const AddTrack = () => {

    const spotifyApi = new SpotifyWebApi();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({})

    const [cookies] = useCookies();
    
    // TODO: Allow user to search tracks in spotify
    useEffect(() => {
        spotifyApi.setAccessToken(cookies.spotify_auth.access_token);
        if (query) {
            spotifyApi.search(query, ['track', 'artist', 'album'])
                .then(res => setResults(res))
        }
    }, [query])

        // typing will populate a menu using a fetch to spotify api
        // click a result will add it to the playlist of the room

    // TODO: Display recommendations using spotify api and room average sentiment, clicking adds to playlist

    // TODO: Display user's recently played songs as suggestions, clicking adds to playlist

    return (
        <div className="add-track">
            <p>Add track</p>
            <input 
                type="text"
                value={query}
                placeholder="Search Spotify"
                onChange={e => setQuery(e.target.value)} />

            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}
