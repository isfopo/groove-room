import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import '../styles/Profile.css';

export const Profile = (props) => {

    const [newMessage, setNewMessage] = useState('');
    const [lastMessage, setLastMessage] = useState({});
    const [messages, setMessages] = useState([]);

    const [cookies] = useCookies();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/messages/create', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                profile_id: props.profile.id,
                content: newMessage
            })
        })

        setNewMessage('');
    }

    useEffect(() => {
        fetch(`http://localhost:3001/messages/last/${props.profile.id}`)
            .then(res => res.json())
            .then(res => setLastMessage(res))
    }, [props.profile, newMessage])

    return (
        <div className={`profile ${ props.profile.id === cookies.user.id && 'active'}`}>

            <img key={props.profile.id} src={props.profile.image} alt="profile" />

            <p>{lastMessage.content}</p>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={newMessage}
                    placeholder="Type a message..."
                    onChange={ e => setNewMessage(e.target.value) } 
                />
            </form>
        </div>
    )
}
