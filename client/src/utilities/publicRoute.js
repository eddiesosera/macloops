import React, { useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { LoginContext } from '../App';
// import { isLogin } from '../u/tils';

const PublicRoute = ({ children }) => {

    const loggedIn = useContext(LoginContext)
    console.log()

    useEffect(() => {
    }, [loggedIn[0]])

    return loggedIn[0] === 'true' ?
        children
        : <Navigate to="/account-login" />
};

export default PublicRoute;