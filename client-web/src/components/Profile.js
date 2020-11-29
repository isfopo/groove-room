import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

export const Profile = (props) => {

    const [readyToType, setReadyToType] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [cookies] = useCookies();

    useEffect(() => {
        fetch(`http://localhost:3001/messages/last/${props.profile.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === 200)
                {
                    setLastMessage(res.dataValues.content)
                } else {
                    setReadyToType(true)
                } 
            })
    }, [props.profile, newMessage])

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
        setReadyToType(false);
    }

    return (
        <div className={`profile ${ props.profile.id === cookies.user.id && 'active'}`}>

            <img key={props.profile.id} src={props.profile.image} alt="profile" />
            <div className="tag" onMouseEnter={() => setReadyToType(true)} onMouseLeave={() => lastMessage && setReadyToType(false)}>
                { !readyToType ?
                    <p className="message">{lastMessage}</p>
                :
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="input"
                            type="text"
                            value={newMessage}
                            placeholder="Type a message..."
                            onChange={ e => setNewMessage(e.target.value) } 
                        />
                    </form>
                }
            </div>
        </div>
    )
}
