import React from 'react'
import { LoginContext } from '../../../../App';
import { useContext } from 'react';

export const EditAccount = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);


    // Logout action
    const logOut = () => {
        sessionStorage.setItem('isLoggedIn', 'false')
        setLoggedIn(sessionStorage.getItem('isLoggedIn'))
        sessionStorage.removeItem("user")
    }


    // Style
    const logButtonStyle = {
        color: '#AA0000', background: 'none', border: 'solid #E9C3C6 0.7px', padding: '10px 28px', fontFamily: 'Montserrat', fontWeight: '600', width: 'fit-content',
    }

    return (
        <div>
            <button onClick={e => { logOut() }} style={logButtonStyle}>Logout</button>
        </div>
    )
}
