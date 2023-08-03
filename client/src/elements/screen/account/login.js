import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";

export const Login = ({ allUsers }) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [formData, setFormData] = useState({})
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginMsg, setLoginMsg] = useState('')
  const navigate = useNavigate()

  const loginAction = async () => {
    await axios.post('http://localhost:5000/api/loginUser', formData,
      { headers: { "Content-Type": "application/json" } })
      .then((loginRes => {
        console.log(loginRes)
        setLoginMsg(loginRes.data)
        loginRes && setLoginStatus(true)
        sessionStorage.setItem('isLoggedIn', 'true')
        setLoggedIn(sessionStorage.getItem("isLoggedIn", "true"))
        navigate('/')
      }))
  }

  useEffect(() => {
    console.log(formData)
  }, [formData, loginMsg, loginStatus])

  return <div>
    <div className="login_heading">Login  is {loggedIn}</div>
    <div>
      {
        loginStatus ? loginMsg : 'Logged off'
      }
    </div>

    <div className="login_container">
      <div className="login_input">
        <input type="text" placeholder="username or email"
          onChange={e => setFormData({ ...formData, username: e.target.value })} />
        <input type="password" placeholder="Enter Passowrd"
          onChange={e => setFormData({ ...formData, password: e.target.value })} />

        <button type="submit"
          onClick={e => { loginAction() }}
        >Login</button>
      </div>

      <div className="login_o-cta">
        <NavLink to="/account-register"><button>Join Macloops</button></NavLink>
        <NavLink to="/account-forgotPassword">Forgot Passowrd</NavLink>
      </div>
    </div>

  </div>;
};
