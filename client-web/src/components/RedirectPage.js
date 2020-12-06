import React, {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { getParamValues } from '../utils/getParamValues.js';

export const RedirectPage = (props) => {
    
    useEffect(() => {
        const { history, location, setSpotifyAuth } = props;
        const authorizationData = getParamValues(location.hash);

        // get time of expiration from 
        authorizationData.expires_at = new Date().getTime() + parseInt(authorizationData.expires_in);

        // puts auth data in a cookie
        setSpotifyAuth( authorizationData );

        // redirect to home page
        history.push(`/`);
    }, [])

    return (
        <div>
            Signed in! Redirecting...
        </div>
    )
}
