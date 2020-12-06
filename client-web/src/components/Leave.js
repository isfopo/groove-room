import React, { useState } from 'react'
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';

export const Leave = (props) => {

    const { history, location } = props;
    const { user, room, profile } = location.state;

    const [confirmed, setConfirmed] = useState(false);

    const leaveRoom = () => {
        fetch('http://localhost:3001/profiles/delete', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({
                profile_id: profile.id,
                room_id: room.id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setConfirmed(true)
                setTimeout(() => {
                    history.push({ pathname: '/', state: { user, room }});
                }, 3000)
            })
    } 

    return (
        <div className="leave">
            { !confirmed ?
                <>
                    <p>Are you sure you want to leave "{room.name}"?</p>
                    <button onClick={leaveRoom}>Yes</button>
                </>
            :
                <p>Left room!</p>
            }
            <button onClick={() => history.push({ pathname: '/', state: { user, room }})}>
                <img src={back} alt="back"/>
            </button>
        </div>
    )
}
