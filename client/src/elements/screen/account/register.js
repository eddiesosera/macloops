import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Register = ({allUsers}) => {
  const [formData, setFormData] = useState({})
  const [regStatus, setRegStatus]= useState(false)
  const [regMsg, setRegMsg]= useState('')

  const registerAction = async ()=>{
    await axios.post('http://localhost:5000/api/addUser', formData,
    {headers: {"Content-Type": "application/json"}})
      .then((regRes=>{
        console.log(regRes)
        regRes && setRegStatus(true)
      }))
  }

  useEffect(()=>{
    console.log(formData)
  },[formData, regStatus])

  return <div>
    <div className="login_heading">Register</div>
    <div>
      {
        regStatus?'Successfully Registered':'Failed Registration'
      }
    </div>
    
    <div className="register_container">
      <div className="register_input">
        <input type="text" placeholder="fullname" 
        onChange={e => setFormData({ ...formData, fullname: e.target.value })}/>
        <input type="text" placeholder="username" 
        onChange={e => setFormData({ ...formData, username: e.target.value })}/>
        <input type="email" placeholder="email" 
        onChange={e => setFormData({ ...formData, email: e.target.value })}/>
        <input type="text" placeholder="role" 
        onChange={e => setFormData({ ...formData, role: e.target.value })}/>
        <input type="password" placeholder="Enter Passowrd"
        onChange={e => setFormData({ ...formData, password: e.target.value })}/>

        <button type="submit" 
        onClick={e=>{registerAction()}}
        >Register</button>
      </div>

      <div className="login_o-cta">
        <NavLink to="/account-login"><button>Login </button></NavLink>
        <NavLink to="/account-forgotPassword">Forgot Passowrd</NavLink>
      </div>
    </div>
    
  </div>;
};
