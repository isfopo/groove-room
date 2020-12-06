import React, { useState } from 'react';

import back from '../icons/arrow_back_ios-24px.svg';

export const Rename = (props) => {

    const { history, location } = props;
    const { user, room } = location.state;

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
                    history.push({ pathname: '/', state: { user, room }});
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

            <button onClick={() => history.push({ pathname: '/', state: { user, room }})}>
                <img src={back} alt="back"/>
            </button>
        </div>
    )
}