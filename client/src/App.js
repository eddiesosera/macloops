import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./elements/sections/navbar";
import { Home } from "./elements/screen/home";
import { Products } from "./elements/screen/products";
import { ProductPage } from "./elements/screen/productPage";
import { Account } from "./elements/screen/account";
import { Cart } from "./elements/screen/account/ecom/cart";
import { Checkout } from "./elements/screen/account/ecom/checkout";
import { Register } from "./elements/screen/account/register";
import { Login } from "./elements/screen/account/login";
import { ForgotPassword } from "./elements/screen/account/forgotPassword";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import PublicRoute from "./utilities/publicRoute";
import PrivateRoute from "./utilities/privateRoute";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faFutbol, faCodeCompare, faCircleHalfStroke, faChartLine } from "@fortawesome/free-solid-svg-icons";
// import anime from 'animejs/lib/anime.es.js';
// import Swiper JS
// import Swiper from 'swiper';
// import 'swiper/css';

// Login context
export const LoginContext = createContext()

function App() {
  // Declaring all variables
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'))
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const userStr = JSON.parse(sessionStorage.getItem('user'))
  const [currentScreen, setCurrentScreen] = useState(useLocation())


  // Get All Users Request
  const getUsers = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/getUsers/");
      setUsers(userRes.data)
      // console.log("Testing User data",userRes.data)
    } catch (err) { console.error(err) }
  }

  // Get All Products
  const getProducts = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/products/");
      setProducts(userRes.data)
      // console.log("Testing Products data",userRes.data)
    } catch (err) { console.error(err) }
  }


  // Main Use Effect
  useEffect(() => {

    // Get All users
    getUsers()
    // Get All products
    getProducts()

    // Update Logged in status
    sessionStorage.getItem('isLoggedIn') === "true" ? setLoggedIn("true") : setLoggedIn("false")

    // Refresh data
    const interval = setInterval(async () => {
      await getUsers()
      await getProducts()
    }, 10000)
    return () => clearInterval(interval)

  }, [loggedIn, userStr])


  // Routes Array
  const path_and_elements = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/products',
      element: <Products />
    },
    {
      path: '/product-page',
      element: <ProductPage />
    },
    {
      path: '/account',
      element: <PrivateRoute><Account /></PrivateRoute>
    },
    {
      path: '/account-register',
      element: <Register allUsers={users} />
    },
    {
      path: '/account-login',
      element: <Login allUsers={users} />
    },
    {
      path: '/account-forgotPassword',
      element: <ForgotPassword />
    },
    {
      path: '/cart',
      element: <PrivateRoute><Cart /></PrivateRoute>
    },
    {
      path: '/checkout',
      element: <PrivateRoute><Checkout /></PrivateRoute>
    }
  ]
  // Map Routes 
  const routes = path_and_elements.map(pae => { return <Route path={pae?.path} element={pae?.element} /> })
  // Refresh Routes
  const refreshRoutes = () => {
    path_and_elements.map(pae => {
      currentScreen.pathname === pae.path && window.location.reload()
    })
  }


  // Initialize Session with default Logged status being: False
  const initSession = () => {
    loggedIn === null && sessionStorage.setItem('isLoggedIn', 'false')
  }
  // Call initialize function
  initSession()


  // User currently logged in
  // code here


  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App" style={{ background: "#F8F5F2" }}>
        {loggedIn}
        <Navbar />
        <Routes>
          {
            routes
          }
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
