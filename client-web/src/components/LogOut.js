import React, { useEffect } from 'react';

export const LogOut = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.history.push('/')
        }, 3000);
    }, [props.history])

    return (
        <div>
            <p>Logged Out</p>
        </div>
    )
}
