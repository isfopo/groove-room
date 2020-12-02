import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import '../styles/AddTrack.css';

import back from '../icons/arrow_back_ios-24px.svg';

const SpotifyWebApi = require('spotify-web-api-js');

export const AddTrack = () => {

    const spotifyApi = new SpotifyWebApi();
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState([])

    const [cookies] = useCookies();
    
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setOffset( offset + 50 );
            spotifyApi.search(query, ['track'], { limit: 50, offset })
                .then( res => setResults([ ...results , ...res.tracks.items ]))
        }
    
    }

    useEffect(() => {
        setOffset(0);
        spotifyApi.setAccessToken(cookies.spotify_auth.access_token);
        if (query) {
            spotifyApi.search(query, ['track'], { limit: 50 })
                .then(res => setResults(res.tracks.items))
        } else {
            setResults([])
        }
    }, [query])

    useEffect(() => {
        console.log(results)
    }, [results])

        // TODO: click a result will add it to the playlist of the room

    // TODO: Display recommendations using spotify api and room average sentiment, clicking adds to playlist

    // TODO: Display user's recently played songs as suggestions, clicking adds to playlist

    return (
        <div className="add-track">
            <p>Add track</p>
            <input 
                type="text"
                value={query}
                placeholder="Search Spotify"
                onChange={ e => setQuery(e.target.value) } />

            <ul className="results" onScroll={handleScroll}>
                { results &&
                    results.map( track => 
                        <>
                            <li key={track.id}>
                                <strong>{track.name}</strong> - {track.artists[0].name}
                            </li>
                        </>
                    )
                }
            </ul>

            <a href="/">
                <img className="back" src={back} alt="back"/>
            </a>
        </div>
    )
}
