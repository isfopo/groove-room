import React, { useState, useEffect } from 'react'

import { scale } from '../utils/scale.js';
import { isEmpty } from '../utils/isEmpty.js';

import '../styles/AddTrack.css';

import back from '../icons/arrow_back_ios-24px.svg';

const SpotifyWebApi = require('spotify-web-api-js');

export const AddTrack = (props) => {

    const spotifyApi = new SpotifyWebApi();

    const { history, location } = props;
    const { user, room, auth, profile } = location.state;

    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState([]);

    const [choice, setChoice] = useState({})
    
    const getRecentAndRecommended = async () => {
        let recent = []
        spotifyApi.setAccessToken(auth.access_token);
        await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 })
                .then(res => {
                    recent = res.items.map( track => track.track.id)
                    setRecentlyPlayed(res.items)
                })

        fetch(`http://localhost:3001/rooms/sentiment/${room.id}`)
            .then(res => res.json())
            .then(res => {

                spotifyApi.getRecommendations({
                    seed_tracks: JSON.parse(room.playlist).length >= 5 ? 
                                    JSON.parse(room.playlist).map(track => track.id).slice(0, 5) : 
                                    Object.values(recent),
                    target_valence: scale(res.sentiment, [-5.0, 5.0], [0, 1] ),
                    limit: 5
                })
                    .then(res => setRecommendations(res.tracks))
            })
    }
    
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setOffset( offset + 50 );
            spotifyApi.search(query, ['track'], { limit: 50, offset })
            .then( res => setResults([ ...results , ...res.tracks.items ]))
        }
    }
    
    /**
     * Adds a new track to room's playlist
     * @param {Object} track object to add
     */
    const addTrack = ( track ) => {
        fetch('http://localhost:3001/rooms/add-track', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ room, track })
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200 ) {
                setChoice(track);
            }
        })
    }

    useEffect(() => {
        getRecentAndRecommended()
    }, [])
    
    useEffect(() => {
        setOffset(0);
        spotifyApi.setAccessToken(auth.access_token);
        if (query) {
            spotifyApi.search(query, ['track'], { limit: 50 })
            .then(res => setResults(res.tracks.items))
        } else {
            setResults([])
        }
    }, [query])

    return (
        <div className="add-track">
            { !isEmpty(choice) ?
                <div className="choice">
                    <img className="choice-image" src={choice.album.images[0].url} alt={`${choice.album.name}'s cover`} />
                    <p>{`"${choice.name}" by ${choice.artists[0].name} was added to ${room.name}'s playlist!`}</p>
                </div>
            :
                <>
                    <p>Add track</p>
                    <input 
                        type="text"
                        value={query}
                        placeholder="Search Spotify"
                        onChange={ e => setQuery(e.target.value) } />

                    { recentlyPlayed &&
                        <div className="recent-tracks suggestions">
                            <p>Recently Played</p>
                            <ul>
                                { 
                                    recentlyPlayed.map( (track, key) => 
                                        <li key={key} className="suggestion-item" onClick={() => addTrack( track.track )}>
                                            <img className="suggestion-image thumbnail" src={track.track.album.images[0].url} alt={`${track.track.album.name}'s cover`} />
                                            <strong>{track.track.name}</strong> - {track.track.artists[0].name}
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    }

                    { recommendations &&
                        <div className="recommendations suggestions">
                            <p>Recommendations</p>
                            <ul>
                                { 
                                    recommendations.map( (track, key) => 
                                        <li key={key} className="suggestion-item" onClick={() => addTrack( track )}>
                                            <img className="suggestion-image thumbnail" src={track.album.images[0].url} alt={`${track.album.name}'s cover`} />
                                            <strong>{track.name}</strong> - {track.artists[0].name}
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    }
                    
                    <ul className="results" onScroll={handleScroll}>
                        { results &&
                            results.map( (track, key) => 
                                <li key={key} className='result-item' onClick={ () => addTrack( track )} >
                                    <strong>{track.name}</strong> - {track.artists[0].name}
                                </li>
                            )
                        }
                    </ul>

                </>
            }
            <button onClick={() => history.push({ pathname: '/', state: { user, room }})}>
                <img src={back} alt="back"/>
            </button>
        </div>
    )
}
