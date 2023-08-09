import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style/navbar.css";
import svgLogo from "../../img/LOGO.svg";
import logopng from "../../img/LOGO.png";
import { Search } from "../components/search";
import { LoginContext } from "../../App";

// import { PianoKeys } from "@phosphor-icons/react";

export const Navbar = ({ userObj }) => {
  // Declaring all variables
  const loggedIn = useContext(LoginContext)
  const scrn = useLocation().pathname;
  const [currScrn, setCurrScrn] = useState(useLocation().pathname);
  const [username, setUsername] = useState("Login");
  const [queryVal, setQueryVal] = useState("");
  const [userLogged, setUserLogged] = useState(userObj)


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
        return <img style={{ height: '30px', width: '30px', borderRadius: '25px' }} src={userLogged?.profile_image !== "" ? userLogged?.profile_image : "https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/"} alt="Profile" />
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
        loggedIn[0] === "true" ? setUsername(userLogged.fullname) : setUsername("Log in")
        imgUpdt()
      }
      console.log(loggedIn[0])
    },
    [currScrn, scrn, userLogged?.profile_image, userLogged, loggedIn[0]]
  );


  //   Styling Active and Inactive states of elements and icons
  const ActiveIcon = {
    fontSize: "24px"
  };
  const InactiveIcon = {
    fontSize: "24px"
  };


  return (
    <div className="navbar_wrap" style={{ display: "flex", justifyContent: "space-between", padding: "30px 100px" }}>
      <div className="navbar_left" style={{ display: "flex", gap: "40px" }}>
        <NavLink to="/" className="navbar_left_logo">
          <img src={logopng} alt="Logo" style={{ height: "24px" }} />
        </NavLink>
        <NavLink to="/products" className="navbar_left_page" style={{ display: "flex" }}>
          {/* <PianoKeys size={32} /> */}
          {currScrn === "/products" ? (
            <i className="ph-fill ph-piano-keys" style={ActiveIcon} />
          ) : (
            <i className="ph ph-piano-keys" style={InactiveIcon} />
          )}
          <div>Instruments</div>
        </NavLink>
        <div className="navbar_middle-search_wrap">
          <Search query={getQuery} />
          {queryVal}
        </div>
      </div>
      <div className="navba_end_wrap" style={{ display: "flex", gap: "40px" }}>
        <NavLink to="/account" style={{ display: "flex" }} >
          {
            imgUpdt()
          }
          <div>{username}</div>
        </NavLink>
        {/* {screens.map(scrn => {
          return (
            <NavLink to={scrn.screenPath} style={{ display: "flex" }} onClick={e => { console.log(loggedIn[0]) }}>
              {scrn.screenPath === currScrn ? (
                <i className={scrn.iconActive} style={ActiveIcon} />
              ) : (
                <i className={scrn.iconDeActive} style={InactiveIcon} />
              )}
              <div>{scrn.screenTitle}</div>
            </NavLink>
          );
        })} */}
      </div>
    </div>
  );
};
