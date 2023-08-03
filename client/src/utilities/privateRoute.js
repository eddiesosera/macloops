import { React, useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { LoginContext } from '../App';
// import { isLogin } from '../u/tils';

const PrivateRoute = ({ children }) => {

    const loggedIn = useContext(LoginContext)

    useEffect(() => {
    }, [loggedIn])

    return (

        loggedIn[0] === "true" ? children : <Navigate to="/account-login" />
    )
};

export default PrivateRoute;