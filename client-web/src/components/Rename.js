import React, { useState } from 'react';
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';

export const Rename = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room));
    const [newName, setNewName] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch('http://localhost:3001/rooms/invite', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                room_id: room.id,
                room_name: newName
            })
        })
            .then(res => res.json())
            .then(res => {
                setConfirmed(true)
                setTimeout(() => {
                    props.history.push('/');
                }, 3000)
            })
        
    }

    return (
        <div className='rename'>

            { !confirmed ?
                <>
                <p>Rename {room.name}?</p>
                <form readOnly onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={newName}
                        placeholder="enter new room name"
                        onChange={e => setNewName(e.target.value)} />
                    <input type="submit" value="Submit" />
                </form>
                </>
            :
                <p>Renamed!</p>
            }

            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}