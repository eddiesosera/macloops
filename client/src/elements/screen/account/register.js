import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import FileUploader from "../../components/fileUploader";

export const Register = ({ allUsers }) => {
  const [formData, setFormData] = useState({})
  const [regStatus, setRegStatus] = useState(false)
  const [regMsg, setRegMsg] = useState('');
  const [img, setImg] = useState('')

  const registerAction = async () => {
    setFormData({ ...formData, cart_items: [""] })
    setFormData({ ...formData, bought_items: [""] })
    setFormData({ ...formData, liked_items: [""] })
    await axios.post('http://localhost:5000/api/addUser', formData,
      { headers: { "Content-Type": "application/json" } })
      .then((regRes => {
        console.log(regRes)
        // regRes && setRegStatus(true)
      }))
  }

  const rolesList = ["admin", "customer"]

  useEffect(() => {
    console.log(formData)
  }, [formData, regStatus])


  return <div>
    <div className="login_heading">Register</div>
    <div>
      {
        regStatus ? 'Successfully Registered' : 'Failed Registration'
      }
    </div>

    <div className="register_container">
      <div className="register_input">
        <img src={img} alt="profile" style={{ height: '80px', width: '80px' }} />
        {/* <FileBase64 multiple={true}
          onDone={e => {
            console.log(e[0].base64);
            setImg(e[0].base64);
          }} /> */}
        <FileUploader multiple={true} fileType=".jpeg, .jpg, .png" onDone={e => {
          console.log(e[0]);
          setImg(e[0].base64);
          setFormData({ ...formData, profile_image: img })
        }} />

        {/* <input type="file" accept="image/*" onChange={e => console.log(e.target.getAttribute)} /> */}
        <input type="text" placeholder="fullname"
          onChange={e => setFormData({ ...formData, fullname: e.target.value })} />
        <input type="text" placeholder="username"
          onChange={e => setFormData({ ...formData, username: e.target.value })} />
        <input type="email" placeholder="email"
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <div>
          <div>Select role:</div>
          {
            rolesList.map(role => {
              return (
                <div onClick={e => setFormData({ ...formData, role: role })}>{role}</div>
              )
            })
          }
        </div>
        <input type="password" placeholder="Enter Passowrd"
          onChange={e => setFormData({ ...formData, password: e.target.value })} />

        <button type="submit"
          onClick={e => { registerAction() }}
        >Register</button>
      </div>

      <div className="login_o-cta">
        <NavLink to="/account-login"><button>Login </button></NavLink>
        <NavLink to="/account-forgotPassword">Forgot Passowrd</NavLink>
      </div>
    </div>

  </div>;
};
