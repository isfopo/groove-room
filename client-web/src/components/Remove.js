import React, { useState } from 'react';
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';

export const Remove = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room))
    const [confirmed, setConfirmed] = useState(false);

    const deleteRoom = () => {

        fetch('http://localhost:3001/rooms/delete', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({
                room_id: room.id
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
        <div className='remove'>
            { !confirmed ?
                <>
                    <p>Are you sure you want to delete "{room.name}"?</p>
                    <button onClick={deleteRoom}>Yes</button>
                </>
            :
                <p>Removed!</p>
            }
            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}