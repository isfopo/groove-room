import React, { useState, useRef } from 'react'

import back from '../icons/arrow_back_ios-24px.svg';
import paste from '../icons/content_paste-24px.svg';

export const JoinRoom = (props) => {

    const { history, location } = props;
    const { user } = location.state;

    const [roomId, setRoomId] = useState("");
    const [responseStatus, setResponseStatus] = useState(0)

    const textAreaRef = useRef(null);

    const pasteFromClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('paste');
        e.target.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/rooms/join', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                room_id: roomId,
                user_id: user.id,
                user_image: user.image
            })
        }).then(res => {
            setResponseStatus(res.status)
            if (res.status === 200) {
                setTimeout(() => {
                    history.push('/')
                }, 3000);
            }     
        })
    }

    return (
        <div className="join-room">
            { responseStatus === 200 ?
                <p>Room joined!</p>
            :
                <>
                { responseStatus === 304 && <p className="error">You are already in that room!</p>}
                { responseStatus === 404 && <p className="error">That room does not exist!</p>}
                    <button onClick={pasteFromClipboard}>
                        <img src={paste} alt="paste"/>
                    </button> 
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            value={roomId}
                            placeholder="enter room id"
                            ref={textAreaRef}
                            onChange={e => setRoomId(e.target.value)} />
                    </form>
                </>
            }
            <button onClick={() => history.push({ pathname: '/', state: { user }})}>
                <img src={back} alt="back"/>
            </button>
        </div>
    )
}
