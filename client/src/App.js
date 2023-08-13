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

import img1 from "./img/hero/1.png";
import img2 from "./img/hero/2.png";
import img3 from "./img/hero/3.png";
import img4 from "./img/hero/4.png";
import img5 from "./img/hero/5.png";
import { Footer } from "./elements/sections/footer";

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
  const userStateSession = sessionStorage.getItem('isLoggedIn')
  const [userObj, setUserObj] = useState(JSON.parse(sessionStorage.getItem('user')))
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'))
  const [users, setUsers] = useState([])
  // const [userLoggedIn, setUserLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'))
  const [products, setProducts] = useState([])
  const [currentScreen, setCurrentScreen] = useState(useLocation())


  // Get All Users Request
  const getUsers = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/getUsers/");
      setUsers(userRes.data)
      console.log("Testing User data", userRes.data)
    } catch (err) { console.error(err) }
  }

  // Get All Products
  // const getProducts = async () => {
  //   try {
  //     const userRes = await axios.get("http://localhost:5000/api/products/");
  //     setProducts(userRes.data)
  //   } catch (err) { console.error(err) }
  // }


  // Main Use Effect
  useEffect(() => {

    // Get All users
    getUsers()
    // Get All products
    // getProducts()

    // Update Logged in status
    setLoggedIn(sessionStorage.getItem('isLoggedIn'))

    // Update Logged in user details
    setUserObj(JSON.parse(sessionStorage.getItem('user')))

    // Refresh data
    // const interval = setInterval(async () => {
    //   // await getUsers()
    //   // await getProducts()
    // }, 10000)
    // return () => clearInterval(interval)

  }, [
    loggedIn,
    userStateSession,
    currentScreen
  ])


  // DEMO - Products
  const product_demo = [
    {
      id: "64cda741ada6611bf071e13a",
      image_cover: img1,
      images: [img1, img1, img1, img1],
      name: 'Grand Piano GBFX1',
      slogan: 'Grand piano designed with your home in mind.',
      category: 'Piano',
      type: 'Grand Piano',
      decription: 'The beautiful French Provincial-style design adds refinement to any room, visually enhancing the pleasure to be found in performance',
      manufacturer: 'Yamaha',
      price: 118000,
      rating: 0.0,
      specifications: {
        dimensions: {
          dimensions_unit: "mm",
          weight_unit: "kg",
          width: 146,
          height: 99,
          depth: 151,
          weight: 261
        }
      }
    },
    {
      id: "64cda741ada6611bf071e13a",
      image_cover: img2,
      images: [img2, img2, img2, img2],
      name: 'Yamaha H67 Monitord',
      slogan: 'Power and Perfomance. Intergreted.',
      category: 'Monitors',
      type: 'Stereo',
      decription: 'Perfectly suited for use with DZR full-range speakers, the DXS15XLF is a powered bass-reflex type subwoofer with extended low frequency, producing a best-in class maximum SPL of 136dB SPL with superb clarity and power.',
      manufacturer: 'Yamaha',
      price: 7850,
      rating: 0.0,
      specifications: {
        dimensions: {
          dimensions_unit: "mm",
          weight_unit: "kg",
          width: 450,
          height: 587,
          depth: 600,
          weight: 40
        }
      }
    },
    {
      id: "64cda741ada6611bf071e13a",
      image_cover: img3,
      images: [img3, img3, img3, img3],
      name: 'F310 Acoustic Guitar',
      slogan: 'Fuel your Creative Fire!',
      category: 'Guitars',
      type: 'Acoustic Guitar',
      decription: 'The F310 is the starting range of Yamahas basic high-end models, with amazing build quality and supreme sound and tone quality.',
      manufacturer: 'Yamaha',
      price: 7850,
      rating: 0.0,
      specifications: {
        dimensions: {
          dimensions_unit: "mm",
          weight_unit: "kg",
          width: 412,
          height: 505,
          depth: 634,
          weight: 96
        }
      }
    },
    {
      id: "64cda741ada6611bf071e13a",
      image_cover: img4,
      images: [img4, img4, img4, img4],
      name: 'NT1 5th Generation',
      slogan: 'Fuel your Creative Fire!',
      category: 'Microphones',
      type: 'Studio Microphone',
      decription: 'The NT1 5th Generation is a revolutionary studio condenser microphone that fuses the classic sound signature of the iconic NT1 with cutting-edge, next-generation technology. It features RØDE’s groundbreaking (patent-pending) Dual Connect output, offering both XLR and USB connectivity for incredible versatility, a world-first “unclippable” 32-bit float digital output, advanced digital signal processing, and more, all while delivering the same warm, silky character, extremely low noise, and high SPL handling that the NT1 is renowned for.',
      manufacturer: 'Rode',
      price: 3500,
      rating: 0.0,
      specifications: {
        dimensions: {
          dimensions_unit: "mm",
          weight_unit: "g",
          width: 50,
          height: 190,
          depth: 50,
          weight: 326
        }
      }
    },
    {
      id: "64cda741ada6611bf071e13a",
      image_cover: img5,
      images: [img5, img5, img5, img5],
      name: 'Guitar GBFX1',
      slogan: 'Grand piano designed with your home in mind.',
      category: 'Guitar',
      type: 'Acoustic Guitar',
      decription: 'The beautiful French Provincial-style design adds refinement to any room, visually enhancing the pleasure to be found in performance',
      manufacturer: 'Yamaha',
      price: 6630,
      rating: 0.0,
      specifications: {
        dimensions: {
          dimensions_unit: "mm",
          weight_unit: "kg",
          width: 146,
          height: 99,
          depth: 151,
          weight: 261
        }
      }
    }
  ];


  // Routes Array
  const path_and_elements = [
    {
      path: '/',
      element: <Home allPosts={product_demo} />
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
      element: <PrivateRoute><Account allProducts={product_demo} /></PrivateRoute>
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
  const routes = path_and_elements.map((pae, i) => { return <Route path={pae?.path} element={pae?.element} /> })
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


  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App" style={{ background: "#F8F5F2" }}>
        {/* {loggedIn} */}
        <Navbar userObj={userObj} />
        <Routes>
          {
            routes
          }
        </Routes>
      </div>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;
