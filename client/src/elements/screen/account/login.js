import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";

export const Login = ({ allUsers }) => {
  const scrn = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [formData, setFormData] = useState({})
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginMsg, setLoginMsg] = useState('')
  const [usrObj, setUsrObj] = useState({})
  const navigate = useNavigate()

  const loginAction = async () => {
    await axios.post('http://localhost:5000/api/loginUser', formData,
      { headers: { "Content-Type": "application/json" } })
      .then((loginRes => {
        // const userValidate = JSON.stringify(sessionStorage.getItem('user'))
        const userStr = JSON.parse(sessionStorage.getItem('user'));
        const usr = loginRes?.data
        sessionStorage.setItem("user", JSON.stringify({
          id: usr[0],
          fullname: usr[1],
          role: usr[2],
          username: usr[3],
          email: usr[4],
          profile_image: usr[5],
          cart_items: usr[6],
          bought_items: usr[7],
          liked_items: usr[8]
        }));

        console.log(userStr)
        console.log(loginRes)
        console.log(loginRes.data)
        setLoginMsg(loginRes.data)
        loginRes && setLoginStatus(true)
        sessionStorage.setItem('isLoggedIn', 'true')
        // setLoggedIn(sessionStorage.setItem("isLoggedIn", "true"))
        navigate('/')

      }))
  }

  useEffect(() => {
    // console.log("login is = " + loggedIn)
    loggedIn === "true" && navigate('/account')
  }, [formData, loginMsg, loginStatus, scrn])

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
