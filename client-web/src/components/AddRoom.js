import React, { useState, useRef } from "react";
import { useCookies } from 'react-cookie';
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';
import copy from '../icons/content_copy-24px.svg';
import done from '../icons/done-24px.svg';
import share from '../icons/share-24px.svg';

export const AddRoom = (props) => {
    
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies();

    const textAreaRef = useRef(null);
  
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopied(true);
        setTimeout(() => {
            props.history.push('/');
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
                id: cookies.user.id,
                image: cookies.user.image
            })
        })
            .then(res => res.json())
            .then(res => setRoomId(res.id))
    }

    return (
        <div className="add-room">
            { !isSubmitted ?
                <form readOnly onSubmit={handleSubmit}>
                    <label>
                        Room Name:
                        <input 
                            type="text"
                            value={roomName}
                            onChange={e => setRoomName(e.target.value)} />
                    </label>
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
                            body: `You are invited to join ${roomName}! Copy "${roomId}" in "Join Room"`
                        })
                    }`}>
                        <img src={share} alt="share" />
                    </a>
                    <form >
                        <textarea
                        readOnly
                        ref={textAreaRef}
                        value={roomId}
                        />
                    </form>
                </div>
            }
            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}
