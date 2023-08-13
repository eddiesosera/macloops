import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { YouMayAlsoLike } from "../sections/you_may_also_like";

export const Account = ({ allUsers, allProducts }) => {
  // Declaring all variables
  const userStateSession = sessionStorage.getItem('isLoggedIn')
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [userObj, setUserObj] = useState(JSON.parse(sessionStorage.getItem('user')));

  // Main UserEffect
  useEffect(() => {

    // Update Logged in user details
    setUserObj(JSON.parse(sessionStorage.getItem('user')))

  }, [userStateSession, loggedIn])


  // Logout action
  const logOut = () => {
    sessionStorage.setItem('isLoggedIn', 'false')
    setLoggedIn(sessionStorage.getItem('isLoggedIn'))
    sessionStorage.removeItem("user")
  }


  // Screens Array: Account & Cart
  const screens = [
    {
      iconActive: "ph-fill ph-user",
      iconDeActive: "ph ph-user",
    },
    {
      iconActive: "ph-fill ph-shopping-bag-open",
      iconDeActive: "ph ph-shopping-bag"
    }
  ];


  // Updating user profile with either User profile, Account Icon or Login icon.
  const imgUpdt = () => {

    const profilImgStyle = {
      height: '100px', width: '100px', borderRadius: '100px', border: '#ccc solid 0.5px'
    }

    if (userObj?.profile_image !== "") {
      return <img style={profilImgStyle} src={userObj?.profile_image} alt="Profile" />
    } else if (userObj?.profile_image === "") {
      return <img style={profilImgStyle} src="https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/" alt="Profile" />
    }

  }


  // 3 account pages
  const account_nav = [
    {
      icon: 'ph-bold ph-shopping-cart-simple',
      title: 'Cart',
      info: 'View items in Cart',
      url: '/cart'
    },
    {
      icon: 'ph-bold ph-heart',
      title: 'Liked',
      info: 'View items you like',
      url: '/account/likes'
    },
    {
      icon: 'ph-bold ph-clock-counter-clockwise',
      title: 'Purchased Items',
      info: 'View items you\'ve\ bought ',
      url: '/account/purchase-hisory'
    }
  ]


  // Style
  const buttonStyle = {
    color: '#2293B6', background: '#C3E1E9', border: 'solid #C3E1E9 0.7px', padding: '10px 8px', fontFamily: 'Montserrat', fontWeight: '600'
  }
  const logButtonStyle = {
    color: '#AA0000', background: 'none', border: 'solid #E9C3C6 0.7px', padding: '10px 8px', fontFamily: 'Montserrat', fontWeight: '600', width: 'fit-content'
  }


  return (
    <div style={{ padding: '20px 60px' }}>

      <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', padding: '0', paddingBottom: '30px' }}>
        <li className="account_wrap" style={{ display: 'flex', border: 'solid 1px #E9E6E1', background: '#FFFBF6', padding: '20px', gap: '20px', alignItems: 'center' }}>
          {
            imgUpdt()
          }
          <div className="account_details_wrap">
            <div className="account_details_wrap" style={{ fontFamily: 'Montserrat', fontWeight: '600', color: '#13120F' }}>{userObj?.fullname.charAt(0).toUpperCase() + userObj?.fullname.slice(1)}</div>
            <div className="account_details_wrap" style={{ fontFamily: 'Nunito Sans', fontSize: '', color: '#6F6D6A' }}>{userObj?.email}</div>
            <div className="account_details_wrap" style={{ fontFamily: 'Nunito Sans', fontSize: '', color: '#6F6D6A' }}>{userObj?.role}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="btn_wrap" style={{ display: 'flex', gap: 10 }}>
                {
                  userObj?.role === "admin" && <button style={buttonStyle} >Manage Inventory</button>
                }

                <NavLink to='/edit-account'>
                  <button style={buttonStyle} >Edit Account</button>
                </NavLink>
              </div>
              <button onClick={e => { logOut() }} style={logButtonStyle}>Logout</button>
            </div>

          </div>
        </li>
        {
          account_nav.map(acc_nav => {
            return (
              <li key={acc_nav?.url} style={{ display: 'flex', border: 'solid 1px #E9E6E1', width: '20%', }}>
                <NavLink to={acc_nav?.url} style={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFBF6' }}>
                  <div className="acc_nav_top wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#13120F' }}>
                    <i className={acc_nav?.icon} style={{ fontSize: '28px' }} />
                    <div className="acc_nav_top_title" style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'MOntserrat', }}>{acc_nav?.title}</div>
                  </div>
                  <hr style={{ width: '100%', border: "0", height: '0.5px', background: '#E9E6E1' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', fontFamily: 'Nunito Sans', color: '#2293B6', fontWeight: '600' }}>
                    <div>{acc_nav?.info}</div>
                    <i className="ri-arrow-right-line" />
                  </div>
                </NavLink>
              </li>
            )
          })
        }
      </ul>

      <hr style={{ width: '100%', border: "0", height: '0.5px', background: '#E9E6E1', marginBottom: '60px' }} />

      <div>
        <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>You May Also Like</div>
            <button style={{ background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Montserrat', fontWeight: '600', padding: '0 20px' }}>View Pianos</button>
          </div>
        </div>
        <YouMayAlsoLike may_like_products={allProducts} />
      </div>

    </div>);
};
