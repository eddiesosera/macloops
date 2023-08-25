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
import { Orders } from "./elements/screen/account/ecom/orders";


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
  // DEMO - Products
  const [product_demo, setProductDemo] = useState(
    [
      {
        id: "id123",
        image_cover: "",
        images: [],
        name: 'Name',
        slogan: 'Slogan',
        category: 'Category',
        type: 'Grand Piano',
        description: 'Description',
        manufacturer: 'Manufacturer',
        price: 0,
        rating: 0.0,
        specifications: {
          dimensions: {
            dimensions_unit: "mm",
            weight_unit: "kg",
            width: 0,
            height: 0,
            depth: 0,
            weight: 0
          },
          color: 'color'
        }
      },
    ]
  );

  console.log("44", userObj)
  // Get All Users Request
  const getUsers = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/getUsers/");
      setUsers(userRes.data)
      console.log("Testing User data", userRes.data)
    } catch (err) { console.error(err) }
  }


  // Scroll to top on page change 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen.pathname])

  // Main Use Effect
  useEffect(() => {


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
    const interval = setInterval(async () => {
      // await getUsers()
      // await getProducts()
    }, 5000)
    return () => clearInterval(interval)

  }, [
    loggedIn,
    userStateSession,
    currentScreen,
    product_demo
  ])


  // Get All Products
  const getProducts = async () => {
    try {
      const productRes = await axios.get("http://localhost:5000/api/products/");
      setProductDemo(productRes.data);
      // console.log("Home", productRes)
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
      element: <PrivateRoute><Products products={product_demo} /></PrivateRoute>
    },
    {
      path: '/product-page/:id',
      element: <ProductPage products={product_demo} userObj={userObj} />
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
      path: '/orders',
      element: <PrivateRoute><Orders /></PrivateRoute>
    },
    {
      path: '/order/:id',
      element: <PrivateRoute><Orders /></PrivateRoute>
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
