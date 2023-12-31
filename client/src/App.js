import { createContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
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
import axios from "axios";
import PublicRoute from "./utilities/publicRoute";
import PrivateRoute from "./utilities/privateRoute";

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
  const [userObj, setUserObj] = useState(JSON.parse(sessionStorage?.getItem('user')));
  const [userString, setUserString] = useState(sessionStorage?.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
  const [users, setUsers] = useState([]);
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


  // Get All Users Request
  const getUsers = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/getUsers/");
      setUsers(userRes.data)
      // console.log("Testing User data", userRes.data)
    } catch (err) { console.error(err) }
  };


  const memoizedUser = useMemo(() => {
    // Perform any computations or transformations you need with sessionData here
    // For example, you can filter or map the data
    // Update Logged in user details
    // setUserObj(JSON.parse(sessionStorage.getItem('user')));

    const newUserData = userObj; // Modify newData based on your computations
    // console.log("updated user")
    return newUserData;

  }, [userString]);


  // Scroll to top on page change 
  useEffect(() => {
  }, [currentScreen.pathname])

  // Main Use Effect
  useEffect(() => {

    getUsers()
    getProducts()

    // Update Logged in status
    setLoggedIn(sessionStorage.getItem('isLoggedIn'));


    console.log("APP USR OBJ", userObj)
    // Refresh data
    setUserString(sessionStorage?.getItem('user'))
  }, [
    loggedIn,
    userStateSession,
    currentScreen,
    userString,
    // userObj
    memoizedUser
    // product_demo
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
  const path_and_elements = [
    {
      path: '/',
      element: <Home allProducts={product_demo} />
    },
    {
      path: '/products/:category',
      element: <Products products={product_demo} userObj={userObj} />
    },
    // {
    //   path: '/products/admin/:id',
    //   element: <PrivateRoute><Products products={product_demo} userObj={userObj} /></PrivateRoute>
    // },
    {
      path: '/product-page/:productId',
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
      element: <PrivateRoute><Cart userObj={userObj} allProducts={product_demo} /></PrivateRoute>
    },
    {
      path: '/checkout',
      element: <PrivateRoute><Checkout /></PrivateRoute>
    },
    {
      path: '/orders',
      element: <PrivateRoute><Orders userObj={userObj} allProducts={product_demo} /></PrivateRoute>
    },
    {
      path: '/order/:id',
      element: <PrivateRoute><Orders /></PrivateRoute>
    },
    {
      path: '*',
      element: <Error404 />
    }
  ];
  // Map Routes 
  const routes = path_and_elements.map((pae, i) => { return <Route key={pae?.path} path={pae?.path} element={pae?.element} /> })
  // Refresh Routes
  const refreshRoutes = () => {
    path_and_elements.map(pae => {
      currentScreen.pathname === pae.path && window.location.reload()
    })
  };


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