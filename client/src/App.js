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
import { EditAccount } from "./elements/screen/account/crud/edit_account";
import { Error404 } from "./elements/screen/404";


// Login context
export const LoginContext = createContext();
export const UsersContext = createContext();
export const ProductsContext = createContext();
export const UserModeContext = createContext();

function App() {
  // Declaring all variables
  const userStateSession = sessionStorage.getItem('isLoggedIn');
  const [userObjRaw, setUserObjRaw] = useState(JSON.parse(sessionStorage?.getItem('user')));
  let userObj = userObjRaw?.usr
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
  const [users, setUsers] = useState([]);
  // const [userLoggedIn, setUserLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'))
  const [products, setProducts] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(useLocation());
  const location = useLocation();
  const [userMode, setUserMode] = useState('user')

  console.log("44", userObj)
  // Get All Users Request
  const getUsers = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/getUsers/");
      setUsers(userRes.data)
      console.log("Testing User data", userRes.data)
    } catch (err) { console.error(err) }
  }


  // Main Use Effect
  useEffect(() => {
    window.scrollTo(0, 0);
    // Get All users
    getUsers()
    // Get All products
    getProducts()

    // Update Logged in status
    setLoggedIn(sessionStorage.getItem('isLoggedIn'))

    // Update Logged in user details
    setUserObjRaw(JSON.parse(sessionStorage.getItem('user')))
    userObj = userObjRaw?.usr

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
  const [product_demo, setProductDemo] = useState(
    [
      {
        id: "64cda741ada6611bf071e13a",
        image_cover: img1,
        images: [img1, img2, img3, img4],
        name: 'Grand Piano GBFX1',
        slogan: 'Grand piano designed with your home in mind.',
        category: 'Piano',
        type: 'Grand Piano',
        description: 'The beautiful French Provincial-style design adds refinement to any room, visually enhancing the pleasure to be found in performance',
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
          },
          color: 'black, white, grey, brown'
        }
      },
      {
        id: "64cda741ada6611bf071e13a1",
        image_cover: img2,
        images: [img1, img2, img3, img4],
        name: 'Yamaha H67 Monitor',
        slogan: 'Power and Perfomance. Intergreted.',
        category: 'Monitors',
        type: 'Stereo',
        description: 'Perfectly suited for use with DZR full-range speakers, the DXS15XLF is a powered bass-reflex type subwoofer with extended low frequency, producing a best-in class maximum SPL of 136dB SPL with superb clarity and power.',
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
          },
          color: 'black, white, grey, brown'
        }
      },
      {
        id: "64cda741ada6611bf071e13a2",
        image_cover: img3,
        images: [img1, img2, img3, img4],
        name: 'Roland Midi Keyboard',
        slogan: 'Fuel your Creative Fire!',
        category: 'Guitars',
        type: 'Acoustic Guitar',
        description: 'The F310 is the starting range of Yamahas basic high-end models, with amazing build quality and supreme sound and tone quality.',
        manufacturer: 'Yamaha',
        price: 2750,
        rating: 0.0,
        specifications: {
          dimensions: {
            dimensions_unit: "mm",
            weight_unit: "kg",
            width: 412,
            height: 505,
            depth: 634,
            weight: 96
          },
          color: 'black, white, grey, brown'
        }
      },
      {
        id: "64cda741ada6611bf071e13a3",
        image_cover: img4,
        images: [img1, img2, img3, img4],
        name: 'NT1 5th Generation',
        slogan: 'Fuel your Creative Fire!',
        category: 'Microphones',
        type: 'Studio Microphone',
        description: 'The NT1 5th Generation is a revolutionary studio condenser microphone that fuses the classic sound signature of the iconic NT1 with cutting-edge, next-generation technology. It features RØDE’s groundbreaking (patent-pending) Dual Connect output, offering both XLR and USB connectivity for incredible versatility, a world-first “unclippable” 32-bit float digital output, advanced digital signal processing, and more, all while delivering the same warm, silky character, extremely low noise, and high SPL handling that the NT1 is renowned for.',
        manufacturer: 'RODE',
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
          },
          color: 'black, white, grey, brown'
        }
      },
      {
        id: "64cda741ada6611bf071e13a4",
        image_cover: img5,
        images: [img1, img2, img4, img5],
        name: 'Guitar GBFX1',
        slogan: 'Grand piano designed with your home in mind.',
        category: 'Guitar',
        type: 'Acoustic Guitar',
        description: 'The beautiful French Provincial-style design adds refinement to any room, visually enhancing the pleasure to be found in performance',
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
          },
          color: 'black, white, grey, brown'
        }
      },
      {
        id: "64cda741ada6611bf071e13a4bbb",
        image_cover: img1,
        images: [img1, img2, img4, img5],
        name: 'Guitar GBFX1',
        slogan: 'Grand piano designed with your home in mind.',
        category: 'Guitar',
        type: 'Acoustic Guitar',
        description: 'The beautiful French Provincial-style design adds refinement to any room, visually enhancing the pleasure to be found in performance',
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
          },
          color: 'black, white, grey, brown'
        }
      }
    ]
  );


  // Get All Products
  const getProducts = async () => {
    try {
      const productRes = await axios.get("http://localhost:5000/api/products/");
      setProductDemo(productRes.data);
      console.log("Home", productRes)
    } catch (err) { console.error(err) }
  }



  // Routes Array
  // Nesting product children routes
  const products_child = [
    {

    }
  ]
  const path_and_elements = [
    {
      path: '/',
      element: <Home allProducts={product_demo} />
    },
    {
      path: '/products',
      element: <Products products={product_demo} userObj={userObj} />
    },
    {
      path: '/products/admin/:id',
      element: <Products products={product_demo} />
    },
    {
      path: '/product-page/:id',
      element: <ProductPage products={product_demo} />
    },
    {
      path: '/account',
      element: <PrivateRoute><Account allProducts={product_demo} userObjct={userObj} /></PrivateRoute>
    },
    {
      path: '/edit-account',
      element: <PrivateRoute><EditAccount allProducts={product_demo} /></PrivateRoute>
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
    },
    {
      path: '*',
      element: <Error404 />
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


  const returnNavbar = () => {
    if (location.pathname === '/account-login'
      || location.pathname === '/account-register'
      || location.pathname === '/products/admin/new') {
      return null
    } else {
      return <Navbar userObj={userObj} />
    }
  }

  const returnFooter = () => {
    if (location.pathname === '/account-login'
      || location.pathname === '/account-register'
      || location.pathname === '/products/admin/new') {
      return null
    } else {
      return <Footer />
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <ProductsContext.Provider value={[product_demo, setProductDemo]}>
        <UserModeContext.Provider value={[userMode, setUserMode]}>
          <div className="App" style={{ background: "#FAF6F2", margin: 0 }}>
            {/* {loggedIn} */}
            {returnNavbar()}
            <Routes>
              {
                routes
              }
            </Routes>
          </div>
          {returnFooter()}
        </UserModeContext.Provider>
      </ProductsContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
