import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";
import { Form } from "../../components/form";
import { Fade, Hinge, JackInTheBox } from "react-awesome-reveal";

export const Login = ({ allUsers }) => {
  const scrn = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [formData, setFormData] = useState({})
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginMsg, setLoginMsg] = useState('')
  const [usrObj, setUsrObj] = useState({})
  const navigate = useNavigate()
  const [inputSelectedTgl, setInputSelectedTgl] = useState(false)


  const loginAction = async () => {
    await axios.post('http://localhost:5000/api/loginUser', formData,
      { headers: { "Content-Type": "application/json" } })
      .then((loginRes => {
        // const userValidate = JSON.stringify(sessionStorage.getItem('user'))
        const userStr = JSON.parse(sessionStorage.getItem('user'));
        const usr = loginRes?.data
        sessionStorage.setItem("user", JSON.stringify({
          usr
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
  };

  useEffect(() => {
    // console.log(formData)
    loggedIn === "true" && navigate('/account')

  }, [formData, loginMsg, loginStatus, scrn]);


  // STYLE
  const inputStyle = {
    border: '0.75px solid #e2ddd6', padding: '12px', width: '350px', background: 'none', fontFamily: 'Nunito Sans', outline: 'none'
  };

  const buttonStyle = {
    display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: '380px', height: '40px',
    background: '#EAF6F9', color: '#2293B6', alignItems: 'center', justifyContent: 'center', gap: '10px',
    marginTop: '20px', marginBottom: '10px', fontSize: '15px'
  };

  const sec_btn = {
    background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Nunito Sans', fontWeight: '500', padding: '12px 20px',
    fontSize: '15px', display: 'flex', alignItems: 'center'
  };


  // Array of Input Fields object
  const inputFields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username or Email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    }
  ];

  const getFormObj = obj => {
    setFormData(obj)
  }

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', width: 'calc(100vw - 17px)', height: '100vh', overflow: 'clip' }}>
      {/* <div className="login_heading">Login  is {loggedIn}</div> */}
      <JackInTheBox cascade damping={0.1}>
        <div className="left_login_container" style={{ width: '100%', overflow: 'hidden' }}>
          <div className="pp_left_wrap" onClick={e => navigate('/')} style={{ position: 'absolute', marginLeft: '20px', marginTop: '20px', display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', background: '#FFFBF6', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
            <i class="ph-bold ph-house" style={{ fontSize: '20px', color: '' }} />
          </div>
          <img src="https://ucarecdn.com/7d4871b0-217b-4949-a3d6-daa438d6f6f2/" alt="Login" style={{ width: '100%', height: '100vh ', objectFit: 'cover' }} />
        </div>
      </JackInTheBox>

      <div className="right_login_container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>

        {/* <form className="login_input" style={{ display: 'flex', gap: '30px', flexDirection: 'column', alignItems: 'center', background: '#FFFBF6', padding: '30px', height: 'fit-content', width: '400px', border: '0.75px solid #E9E6E1' }}>
          <div className="login_Label" style={{ fontFamily: 'Montserrat', fontWeight: '700', color: '#13120F', fontSize: '48px' }}>Login</div>
          <div className="input_wrap" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {
              inputFields.map(input => {
                return (
                  <input type={input?.type} placeholder={input?.placeholder} style={input.style} onChange={e => input.input(e)} />
                )
              })
            }

            <button type="submit" style={buttonStyle} onClick={e => { loginAction(e) }}>
              Login
            </button>
          </div>
        </form> */}
        <Fade cascade damping={0.1}>
          <Form formFields={inputFields} heading={'Log in'} btnAction={loginAction} btnTitle={'Login'} formObj={getFormObj} />
        </Fade>

        <div className="login_o-cta" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <NavLink to="/account-register"><button style={sec_btn}>Join Macloops</button></NavLink>
          <NavLink style={{ color: "#2293B6", fontFamily: 'Nunito Sans', fontWeight: '500', fontSize: '14px' }} to="/account-forgotPassword">
            Forgot Password?
          </NavLink>
        </div>
      </div>

    </div >

  )
};
