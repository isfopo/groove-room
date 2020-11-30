import React, { useState } from 'react';
import queryString from 'query-string';

export const Remove = (props) => {

    const [room] = useState(queryString.parse(props.match.params.room))

    return (
        <div className='remove'>
            
        </div>
    )
}