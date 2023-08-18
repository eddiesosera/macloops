import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import FileUploader from "../../components/fileUploader";
import { Form } from "../../components/form";
import { ImageUpload } from "../../components/imageUpload";

export const Register = ({ allUsers }) => {
  const [formData, setFormData] = useState({})
  const [regStatus, setRegStatus] = useState(false)
  const [regMsg, setRegMsg] = useState('');
  const [img, setImg] = useState('')
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  const registerAction = async () => {
    await axios.post('http://localhost:5000/api/addUser', formData,
      { headers: { "Content-Type": "application/json" } })
      .then((regRes => {
        console.log(regRes)
        // regRes && setRegStatus(true)
      }))
    // alert(formData.username)
  }


  useEffect(() => {
    console.log(formData)
  }, [formData, regStatus, profile])


  // Array of Input Fields object
  const inputFields = [
    {
      name: 'profileImage',
      type: 'single_image',
      placeholder: 'Username or Email',
      // input: (e) => { setFormData({ ...formData, profile_image: profile }) }
    },
    {
      name: 'fullname',
      type: 'text',
      placeholder: 'Fullname',
    },
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email',
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
    },
    {
      name: 'role',
      type: 'dropdown',
      placeholder: 'Role of user',
      options: ['Admin', 'User'],
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


  // STYLE
  const sec_btn = {
    background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Nunito Sans', fontWeight: '500', padding: '12px 20px',
    fontSize: '15px'
  };


  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', width: 'calc(100vw - 17px)', height: '100vh', overflow: 'clip' }}>

      <div className="left_login_container" style={{ width: '100%', overflow: 'hidden' }}>
        <div className="pp_left_wrap" onClick={e => navigate('/')} style={{ position: 'absolute', marginLeft: '20px', marginTop: '20px', display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', background: '#FFFBF6', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
          <i class="ph-bold ph-house" style={{ fontSize: '20px', color: '' }} />
        </div>
        <img src="https://ucarecdn.com/7d4871b0-217b-4949-a3d6-daa438d6f6f2/" alt="Login" style={{ width: '100%', height: '100vh ', objectFit: 'cover' }} />
      </div>

      <div className="right_login_container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        <Form formFields={inputFields} heading={'Register'} btnAction={registerAction} btnTitle={'Register'} formObj={getFormObj} />

        <div className="login_o-cta" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <NavLink to="/account-login"><button style={sec_btn}>Login instead</button></NavLink>
          <NavLink style={{ color: "#2293B6", fontFamily: 'Nunito Sans', fontWeight: '500', fontSize: '14px' }} to="/account-forgotPassword">
            Forgot Password?
          </NavLink>
        </div>
      </div>

    </div>);
};
