import React from 'react'
import { useCookies } from 'react-cookie';

export const Profile = (props) => {

    const [cookies] = useCookies();

    return (
        <div className={`profile ${ props.profile.id === cookies.user.id && 'active'}`}>
            <img key={props.profile.id} src={props.profile.image} alt="profile" />
        </div>
    )
}
