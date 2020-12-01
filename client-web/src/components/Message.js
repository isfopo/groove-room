import React, { useState, useEffect } from 'react'

export const Message = (props) => {

    const { userProfile, message } = props;
    const [profile, setProfile] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/profiles/${message.profile_id}`)
            .then(res => res.json())
            .then(res => setProfile(res))
    }, [message.profile_id])
    
    
    return (
        <div className={` ${userProfile.id === message.profile_id && "active-message" } message"`}>
            <img className="thumbnail" src={profile.image} alt="profile" />
            <p className="message">{message.content}</p>
        </div>
    )
}
