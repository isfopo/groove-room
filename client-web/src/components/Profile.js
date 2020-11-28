import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

export const Profile = (props) => {

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])

    const [cookies] = useCookies();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newMessage)
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
            .then(res => res.json())
            .then(res => console.log(res))

        setNewMessage('');
    }

    // useEffect(() => {
    //     fetch(`http://localhost:3001/messages/${props.currentRoom.id}`)
    //         .then(res => res.json())
    //         .then(res => setMessages(res))
    // }, [props.currentRoom])

    return (
        <div className={`profile ${ props.profile.id === cookies.user.id && 'active'}`}>

            <img key={props.profile.id} src={props.profile.image} alt="profile" />

            {
                messages.map( message => 
                    <p className='message'>{message.content}</p>
                )
            }

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={newMessage}
                    placeholder="Type a message..."
                    onChange={e => setNewMessage(e.target.value)} />
            </form>
        </div>
    )
}
