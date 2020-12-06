import React, {useEffect} from 'react';
import { getParamValues } from '../utils/getParamValues.js';

export const RedirectPage = (props) => {
    
    useEffect(() => {
        const { history, location, setSpotifyAuth } = props;
        const authorizationData = getParamValues(location.hash);

        authorizationData.expires_at = new Date().getTime() + parseInt(authorizationData.expires_in);

        setSpotifyAuth( authorizationData );

        history.push(`/`);
    }, [])

    return (
        <div>
            Signed in! Redirecting...
        </div>
    )
}
