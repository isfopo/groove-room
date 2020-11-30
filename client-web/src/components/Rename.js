import React, { useState } from 'react';
import queryString from 'query-string';

import back from '../icons/arrow_back_ios-24px.svg';

export const Rename = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room))

    return (
        <div className='rename'>
            <a href="/">
                <img src={back} alt="back"/>
            </a>
        </div>
    )
}