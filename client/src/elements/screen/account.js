import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../App";

export const Account = (allUsers, allPosts) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  return <div>account
    {
      // isLoggedIn?setIsLoggedIn(true):<Navigate to="/account-login" />
    }
    <button onClick={e => {
      sessionStorage.setItem('isLoggedIn', 'false')
      setLoggedIn(sessionStorage.getItem('isLoggedIn'))
    }}>Logout</button>
  </div>;
};
