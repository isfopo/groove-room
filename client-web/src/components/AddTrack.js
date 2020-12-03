import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import queryString from 'query-string';

import { scale } from '../utils/scale.js'

import '../styles/AddTrack.css';

import back from '../icons/arrow_back_ios-24px.svg';

const SpotifyWebApi = require('spotify-web-api-js');

export const AddTrack = (props) => {

    const spotifyApi = new SpotifyWebApi();

    const [room] = useState(queryString.parse(props.match.params.room));

    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState([])

    const [cookies] = useCookies();
    
    const getRecentAndRecommended = async () => {
        let recent = []
        spotifyApi.setAccessToken(cookies.spotify_auth.access_token);
        await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 })
                .then(res => {
                    recent = res.items.map( track => track.track.id)
                    setRecentlyPlayed(res.items)
                })

        fetch(`http://localhost:3001/rooms/sentiment/${room.id}`)
            .then(res => res.json())
            .then(res => {
                spotifyApi.getRecommendations({
                    // use recently played tracks to seed
                    seed_tracks: Object.values(recent),
                    target_valence: scale(res.sentiment, [-5.0, 5.0], [0, 1] ),
                    limit: 5
                })
                    .then(res => setRecommendations(res.tracks))
            })
    }

    useEffect(() => {
        getRecentAndRecommended()
    }, [])
    
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
    
    
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setOffset( offset + 50 );
            spotifyApi.search(query, ['track'], { limit: 50, offset })
                .then( res => setResults([ ...results , ...res.tracks.items ]))
        }
    }

    const addTrack = (track) => {
        fetch('http://localhost:3001/rooms/add-track', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ room, track })
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }
    // TODO: render recently played with image, track name, artist name and album
    // TODO: render recommendations with image, track name, artist name and album
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
                    results.map( (track, key) => 
                        <li key={key} onClick={ () => addTrack( track )} >
                            <strong>{track.name}</strong> - {track.artists[0].name}
                        </li>
                    )
                }
            </ul>

            <a href="/">
                <img className="back" src={back} alt="back"/>
            </a>
        </div>
    )
}
