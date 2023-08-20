import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style/navbar.css";
// import svgLogo from "../../img/LOGO.svg";
import logopng from "../../img/LOGO.png";
import { Search } from "../components/search";

import { LoginContext } from "../../App";
import { MacloopsLogo, MacloopsLogoAnimated } from "../components/svgs";


// import { PianoKeys } from "@phosphor-icons/react";


export const Navbar = ({ userObj }) => {
  // Declaring all variables
  const loggedIn = useContext(LoginContext)
  const scrn = useLocation().pathname;
  const [currScrn, setCurrScrn] = useState(useLocation().pathname);
  const [username, setUsername] = useState("Login");
  const [queryVal, setQueryVal] = useState("");


  // Screens Array: Account & Cart
  const screens = [
    {
      screenTitle: username,
      screenPath: "/account",
      iconActive: "ph-fill ph-user",
      iconDeActive: "ph ph-user",
      i: "https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/"
    },
    {
      screenTitle: "Cart",
      screenPath: "/cart",
      iconActive: "ph-fill ph-shopping-bag-open",
      iconDeActive: "ph ph-shopping-bag"
    }
  ];


  // Updating search input value
  const getQuery = q => {
    setQueryVal(q);
  };


  // Updating user profile with either User profile, Account Icon or Login icon.
  const imgUpdt = () => {
    if (loggedIn[0] !== null) {
      if (loggedIn[0] === "true") {
        return <img style={{ height: '24px', width: '24px', borderRadius: '25px', border: '#ccc solid 0.5px' }} src={userObj?.profile_image !== "" ? userObj?.profile_image : "https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/"} alt="Profile" />
      } else {
        if (screens[0].screenPath === currScrn) {
          return <i className={screens[0].iconActive} style={ActiveIcon} />
        } else {
          return <i className={screens[0].iconDeActive} style={InactiveIcon} />
        }
      }
    }
  }


  // Main Use Layout Effect for re-rendering elements
  useLayoutEffect(
    () => {
      setCurrScrn(scrn);
      console.log(currScrn);
      if (loggedIn[0] !== null) {
        loggedIn[0] === "true" ? setUsername(userObj?.fullname) : setUsername("Log in")
        imgUpdt()
      }
      console.log(loggedIn[0])
    },
    [currScrn, scrn, userObj?.username, loggedIn[0]]
  );


  //   Styling Active and Inactive states of elements and icons
  const ActiveIcon = {
    fontSize: "24px", color: '#13120f', fontWeight: "500", fontFamily: 'Montserrat'
  };
  const InactiveIcon = {
    fontSize: "24px", color: '#13120f', fontWeight: "500", fontFamily: 'Montserrat'
  };


  return (
    <div className="navbar_wrap" style={{ zIndex: 3, display: "flex", justifyContent: "space-between", padding: "20px 60px", background: '#FFCF86', position: 'sticky', top: '0', alignItems: 'center', borderBottom: '1px solid #e2b774' }}>
      <div className="navbar_left" style={{ display: "flex", gap: "40px", alignItems: 'center' }}>
        <NavLink to="/" className="navbar_left_logo">
          {/* <img src={logopng} alt="Logo" style={{ height: "24px" }} /> */}
          <MacloopsLogo height={24} width={'123px'} color={'#13120f'} />
          {/* <MacloopsLogoAnimated height={24} width={'123px'} color={'#13120f'} /> */}
        </NavLink>
        <NavLink to="/products" className="navbar_left_page" style={{ display: "flex", gap: '10px', color: 'inherit !important' }}>
          {/* <PianoKeys size={32} /> */}
          {currScrn === "/products" ? (
            <i className="ph-fill ph-piano-keys" style={ActiveIcon} />
          ) : (
            <i className="ph ph-piano-keys" style={InactiveIcon} />
          )}
          <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/products" ? '800' : '500', color: '#13120f' }}>Instruments</div>
        </NavLink>
        <div className="navbar_middle-search_wrap">
          <Search query={getQuery} />
          {queryVal !== "" && 'Searching for: "' + queryVal + '"'}
        </div>
      </div>
      <div className="navba_end_wrap" style={{ display: "flex", gap: "40px" }}>
        <NavLink to="/cart" className="navbar_left_page" style={{ display: "flex", gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {currScrn === "/cart" ? (
              <i className="ph-fill ph-shopping-cart-simple" style={ActiveIcon} />
            ) : (
              <i className="ph-bold ph-shopping-cart-simple" style={InactiveIcon} />
            )}
            <div className="cart_itms_no" style={{ display: userObj?.cart_items.length !== 0 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', background: 'black', color: 'white', height: 'fit-content', width: 'fit-content', minWidth: '14px', minHeight: '14px', padding: '2px', borderRadius: '18px', fontSize: '10px', marginLeft: '-12px', marginTop: '-6px', border: '2.5px solid #FFCF86' }}>
              {userObj?.cart_items.length}
            </div>
          </div>
          <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/cart" ? '800' : '500', color: '#13120f' }}>Cart</div>
        </NavLink>
        <NavLink to="/account" style={{ display: "flex", gap: '10px', alignItems: 'center' }} >
          {
            imgUpdt()
          }
          <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/account" ? '800' : '500', color: '#13120f' }}>{username}</div>
        </NavLink>
      </div>
    </div>
  );
};
