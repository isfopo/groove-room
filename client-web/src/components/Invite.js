import React, { useState, useRef } from 'react';
import queryString from 'query-string';

import copy from '../icons/content_copy-24px.svg';
import done from '../icons/done-24px.svg';
import back from '../icons/arrow_back_ios-24px.svg';
import share from '../icons/share-24px.svg';

export const Invite = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room));
    const [copied, setCopied] = useState(false);

    const textAreaRef = useRef(null);

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopied(true);
        setTimeout(() => {
            props.history.push('/');
        }, 3000)
    };

    return (
        <div className='invite'>
            { document.queryCommandSupported('copy') &&
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
            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}
