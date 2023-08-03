import React from "react";
import { NavLink } from "react-router-dom";

export const Register = ({allUsers}) => {
  return <div>
     <div className="login_heading">Login</div>
    
    <div className="login_container">
      <div className="login_input">
        <input type="text" placeholder="username or email"/>
        <input type="password" placeholder="Enter Passowrd"/>

        <button type="submit">Login</button>
      </div>

      <div className="login_o-cta">
        <NavLink to="/account-register"><button>Join Macloops</button></NavLink>
        <NavLink to="/account-forgotPassword">Forgot Passowrd</NavLink>
      </div>
    </div>
  </div>;
};
