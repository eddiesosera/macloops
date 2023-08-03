import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Account = (allUsers, allPosts) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return <div>account
    {
      isLoggedIn?setIsLoggedIn(true):<Navigate to="/account-login" />
    }
  </div>;
};
