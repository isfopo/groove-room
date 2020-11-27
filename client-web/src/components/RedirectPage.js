import React, {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { getParamValues } from '../utils/functions';

export const RedirectPage = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['authorization-cookie']);
    
    
    useEffect(() => {
        const { history, location } = props;
        const authorizationData = getParamValues(location.hash);

        // get time of expiration from 
        authorizationData.expires_at = new Date().getTime() + parseInt(authorizationData.expires_in);

        // puts auth data in a cookie
        setCookie('spotify_auth', JSON.stringify(authorizationData));

        // redirect to home page
        history.push('/');
    }, [])

    return (
        <div>
            Redirect Page
        </div>
    )
}
