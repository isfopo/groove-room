import React, { useState } from "react";

import back from '../icons/arrow_back_ios-24px.svg';

export const AddRoom = (props) => {
    
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitted(true)
        // use name state because it was already set
        // post new room in database

    }
    
    const goBack = () => {
        props.history.push('/');
    }

    return (
        <div className="add-room">
        { !isSubmitted ?
            <form onSubmit={handleSubmit}>
                <label>
                    Room Name:
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        :
            <p>{name}</p>
        }
        <button onClick={goBack}>
            <img src={back} alt="back"/>
        </button>
        </div>
    )
}
