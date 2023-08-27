import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style/navbar.css";
// import svgLogo from "../../img/LOGO.svg";
import logopng from "../../img/LOGO.png";
import { Search } from "../components/search";

import { LoginContext, UserModeContext } from "../../App";
import { MacloopsLogo, MacloopsLogoAnimated } from "../components/svgs";
import { ReactComponent as LogoAnime } from "../../img/LOGO_outline_animated.svg"


// import { PianoKeys } from "@phosphor-icons/react";

export const Navbar = ({ userObj }) => {
  // Declaring all variables
  const loggedIn = useContext(LoginContext)
  const scrn = useLocation().pathname;
  const [currScrn, setCurrScrn] = useState(useLocation().pathname);
  const [username, setUsername] = useState("Login");
  const [queryVal, setQueryVal] = useState("");
  const [userMode, setUserMode] = useContext(UserModeContext);
  const logoSVG = require("../../img/LOGO_outline_animated.svg")

  console.log(userMode)
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
        return <img style={{ height: '24px', width: '24px', borderRadius: '25px', border: '#ebbe7a solid 0.5px' }} src={userObj?.profile_image !== "" ? userObj?.profile_image : "https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/"} alt="Profile" />
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


  // User Mode: Admin is active
  const adminNavbarReturn = () => {
    if (userMode === "admin") {
      return (
        <div className="navebar_user_mode" style={{
          background: '#EAF6F9', borderBottom: '0.5px solid #74c8e2', padding: '10px 60px', fontFamily: 'Nunito Sans', fontWeight: '600',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div className="user_mode_text" style={{ color: '#2293B6', fontSize: '14px' }}>You are now in Admin mode. You can edit stock details!</div>
          <div className="user_mode_close" style={{ color: '#2293B6', cursor: 'pointer' }} onClick={e => setUserMode("user")}>
            <i class="ph-bold ph-x-circle" style={{ fontSize: '21px' }} />
          </div>

        </div>
      )
    }
  }

  const [animeLogoTgl, setAnimeLogoTgl] = useState(false);
  const [nrmlLogoTgl, setNrmlLogoTgl] = useState(true);

  const logoTgl = () => {

    setAnimeLogoTgl(true);
    setNrmlLogoTgl(false);
    // alert(nrmlLogoTgl)

    const animeTime = 4900;
    setTimeout(() => {
      setAnimeLogoTgl(false);
      setNrmlLogoTgl(true);
      // alert(animeLogoTgl)
    }, animeTime);

  }


  return (
    <div style={{ position: 'sticky', top: '0', zIndex: 5, }}>
      {
        adminNavbarReturn()
      }
      <div className="navbar_wrap" style={{ display: "flex", justifyContent: "space-between", padding: "20px 60px", background: '#FFCF86', alignItems: 'center', borderBottom: '1px solid #e2b774' }}>
        <div className="navbar_left" style={{ display: "flex", gap: "40px", alignItems: 'center' }}>
          <NavLink to="/" className="navbar_left_logo" onClick={e => logoTgl()}>
            {/* <img src={logopng} alt="Logo" style={{ height: "24px" }} /> */}
            <div style={{ display: nrmlLogoTgl ? "flex" : "none", alignItems: 'center' }}>
              <MacloopsLogo height={24} width={'123px'} color={'#13120f'} />
            </div>
            <LogoAnime height="24px" style={{ display: animeLogoTgl ? "block" : "none" }} />
            {/* <MacloopsLogoAnimated height={24} width={'123px'} color={'#13120f'} /> */}
          </NavLink>
          <NavLink to="/products" className="navbar_left_page" style={{ display: "flex", alignItems: 'center', gap: '10px', color: 'inherit !important' }}>
            {/* <PianoKeys size={32} /> */}
            {currScrn === "/products" ? (
              <i className="ph-fill ph-piano-keys" style={ActiveIcon} />
            ) : (
              <i className="ph ph-piano-keys" style={InactiveIcon} />
            )}
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/products" ? '900' : '700', color: '#13120f', fontSize: '15px' }}>Instruments</div>
          </NavLink>
          <NavLink to="/find-store" className="navbar_left_page" style={{ display: "flex", alignItems: 'center', gap: '10px', color: 'inherit !important' }}>
            {/* <PianoKeys size={32} /> */}
            {currScrn === "/find-store" ? (
              <i className="ph-fill ph-map-pin" style={ActiveIcon} />
            ) : (
              <i className="ph ph-map-pin" style={InactiveIcon} />
            )}
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/find-store" ? '900' : '700', color: '#13120f', fontSize: '15px' }}>Find a Store</div>
          </NavLink>
          <div className="navbar_middle-search_wrap">
            <Search query={getQuery} />
            {queryVal !== "" && 'Searching for: "' + queryVal + '"'}
          </div>
        </div>
        <div className="navba_end_wrap" style={{ display: "flex", gap: "40px" }}>
          <NavLink to="/orders" className="navbar_left_page" style={{ display: "flex", alignItems: 'center', gap: '10px', color: 'inherit !important' }}>
            {/* <PianoKeys size={32} /> */}
            {currScrn === "/orders" ? (
              <i className="ph-fill ph-book-open" style={ActiveIcon} />
            ) : (
              <i className="ph-bold ph-book" style={InactiveIcon} />
            )}
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/orders" ? '900' : '700', color: '#13120f', fontSize: '15px' }}>Orders</div>
          </NavLink>
          <NavLink to="/cart" className="navbar_left_page" style={{ display: "flex", gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              {currScrn === "/cart" ? (
                <i className="ph-fill ph-shopping-cart-simple" style={ActiveIcon} />
              ) : (
                <i className="ph-bold ph-shopping-cart-simple" style={InactiveIcon} />
              )}
              {

              }
              <div className="cart_itms_no" style={{ display: userObj?.cart_items?.length !== undefined ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', background: 'black', color: 'white', height: 'fit-content', width: 'fit-content', minWidth: '14px', minHeight: '14px', padding: '2px', borderRadius: '18px', fontSize: '10px', marginLeft: '-12px', marginTop: '-6px', border: '2.5px solid #FFCF86' }}>
                {userObj?.cart_items?.length}
              </div>
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/cart" ? '900' : '700', color: '#13120f', fontSize: '15px' }}>Cart</div>
          </NavLink>
          <NavLink to="/account" style={{ display: "flex", gap: '10px', alignItems: 'center' }} >
            {
              imgUpdt()
            }
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: currScrn === "/account" ? '700' : '700', color: '#13120f', fontSize: '15px' }}>{username}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
