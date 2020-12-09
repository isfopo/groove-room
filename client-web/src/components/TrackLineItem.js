import React from 'react'

export const TrackLineItem = (props) => {

    const { track, active, setActiveTrack } = props

    return (
        <div className={`${active && "active"}`} onClick={() => setActiveTrack(track)} >
            <img className="thumbnail" src={track.album.images[0].url} alt={`${track.album.name} cover`} />
            
            <p><strong>{track.name}</strong> - {track.artists[0].name}</p>
        </div>
    )
}
