import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import FileUploader from "../../components/fileUploader";
import { Form } from "../../components/form";
import { ImageUpload } from "../../components/imageUpload";

export const Register = ({ allUsers }) => {
  const [formData, setFormData] = useState({})
  const [regStatus, setRegStatus] = useState(false)
  const [regMsg, setRegMsg] = useState('');
  const [img, setImg] = useState('')
  const [profile, setProfile] = useState('')

  const registerAction = async () => {
    // await axios.post('http://localhost:5000/api/addUser', formData,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((regRes => {
    //     console.log(regRes)
    //     // regRes && setRegStatus(true)
    //   }))
    alert(formData.username)
  }

  const rolesList = ["admin", "customer"]


  useEffect(() => {
    console.log(formData)
  }, [formData, regStatus, profile])

  const b = 'rrr'
  // Array of Input Fields object
  const inputFields = [
    {
      name: 'profileImage',
      type: 'image',
      placeholder: 'Username or Email',
      input: (e) => { setFormData({ ...formData, profile_image: profile }) }
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username or Email',
      input: (e) => { setFormData({ ...formData, username: e.target.value }) }
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      input: (e) => { setFormData({ ...formData, password: e.target.value }); }
    }
  ];

  const getImg = (img) => {
    setProfile(img[0]?.data_url)
    console.log(profile)
  }


  return <div>
    <Form formFields={inputFields} heading={'Register'} btnAction={registerAction} btnTitle={'Register'} imgs={getImg} />
  </div>;
};
