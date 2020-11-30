import React, { useState } from 'react'
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';

export const Leave = (props) => {

    // TODO: allow user to leave room

    const [data] = useState(queryString.parse(props.match.params.room));
    const [confirmed, setConfirmed] = useState(false);

    const leaveRoom = () => {
        fetch('http://localhost:3001/profiles/delete', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({
                profile_id: data.profile_id,
                room_id: data.room_id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setConfirmed(true)
                setTimeout(() => {
                    props.history.push('/');
                }, 3000)
            })
    } 

    return (
        <div className="leave">
            { !confirmed ?
                <>
                    <p>Are you sure you want to leave "{data.room_name}"?</p>
                    <button onClick={leaveRoom}>Yes</button>
                </>
            :
                <p>Left room!</p>
            }
            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}
