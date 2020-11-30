import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
