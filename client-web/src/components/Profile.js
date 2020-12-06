import React, { useState, useEffect } from 'react'

export const Profile = (props) => {

    const { user, profile } = props;

    const [readyToType, setReadyToType] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/messages/last/${profile.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === 200)
                {
                    setLastMessage(res.dataValues.content)
                } else {
                    setReadyToType(true)
                } 
            })
    }, [profile, newMessage])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/messages/create', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                profile_id: profile.id,
                content: newMessage
            })
        })

        setNewMessage('');
        setReadyToType(false);
    }

    return (
        <div className={`profile ${ profile.user_id === user.id && 'active'}`}>

            <img key={ profile.id } src={ profile.image } alt="profile" />
            <div className="tag" onMouseEnter={() => setReadyToType(true)} onMouseLeave={() => lastMessage && !newMessage && setReadyToType(false)}>
                { profile.user_id !== user.id || !readyToType ?
                    <p className="message">{lastMessage}</p>
                :
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="input"
                            type="text"
                            value={newMessage}
                            placeholder="Type a message..."
                            onChange={ e => {
                                if (e.target.value) {
                                    setNewMessage(e.target.value)
                                } else {
                                    setNewMessage(e.target.value)
                                    setReadyToType(false) } 
                                }
                            }
                        />
                    </form>
                }
            </div>
        </div>
    )
}
