import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const LogOut = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    useEffect(() => {
        removeCookie("user"); // not removing cookie
        setTimeout(() => {
            props.history.push('/')
        }, 3000);
    }, [props.history, removeCookie])

    return (
        <div>
            <p>Logged Out</p>
        </div>
    )
}
