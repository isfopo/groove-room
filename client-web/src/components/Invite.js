import React, { useState } from 'react';
import queryString from 'query-string';

export const Invite = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room))

    return (
        <div className='invite'>
            
        </div>
    )
}
