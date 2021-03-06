import React, { useState, useRef } from "react";
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';
import copy from '../icons/content_copy-24px.svg';
import done from '../icons/done-24px.svg';
import share from '../icons/share-24px.svg';

export const AddRoom = (props) => {

    const { history, location } = props;
    const { user } = location.state;
    
    const [roomName, setRoomName] = useState("");
    const [room, setRoom] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const textAreaRef = useRef(null);
  
    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopied(true);
        setTimeout(() => {
            history.push({ pathname: '/', state: { user, room }});
        }, 3000)
    };
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitted(true);
        fetch('http://localhost:3001/rooms/create', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                room_name: roomName,
                id: user.id,
                image: user.image
            })
        })
            .then(res => res.json())
            .then(res => setRoom(res))
    }

    return (
        <div className="add-room">
            { !isSubmitted ?
                <form readOnly onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={roomName}
                        placeholder="enter room name"
                        onChange={e => setRoomName(e.target.value)} />
                    <input type="submit" value="Submit" />
                </form>
            :
                <div>
                    {
                    document.queryCommandSupported('copy') &&
                        <div>
                            <button onClick={copyToClipboard}>
                                { !copied ?
                                    <img src={copy} alt="copy"/>
                                :
                                    <img src={done} alt="done"/>
                                }
                            </button> 
                        </div>
                    }
                    <a target="_blank" rel="noreferrer"
                        href={`mailto:?${
                        queryString.stringify({
                            subject: "Groove Room Id",
                            body: `You are invited to join ${room.name}! Copy "${room.id}" in "Join Room"`
                        })
                    }`}>
                        <img src={share} alt="share" />
                    </a>
                    <form >
                        <textarea
                        readOnly
                        ref={textAreaRef}
                        value={room.id}
                        />
                    </form>
                </div>
            }
            <button onClick={() => history.push({ pathname: '/', state: { user, room }})}>
                <img src={back} alt="back"/>
            </button>
        </div>
    )
}
