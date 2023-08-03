import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./elements/sections/navbar";
import { Home } from "./elements/screen/home";
import { Products } from "./elements/screen/products";
import { ProductPage } from "./elements/screen/productPage";
import { Account } from "./elements/screen/account";
import { Cart } from "./elements/screen/ecom/cart";
import { Checkout } from "./elements/screen/ecom/checkout";
import { Register } from "./elements/screen/account/register";
import { Login } from "./elements/screen/account/login";
import { ForgotPassword } from "./elements/screen/account/forgotPassword";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faFutbol, faCodeCompare, faCircleHalfStroke, faChartLine } from "@fortawesome/free-solid-svg-icons";
// import anime from 'animejs/lib/anime.es.js';
// import Swiper JS
// import Swiper from 'swiper';
// import 'swiper/css';


function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  // Get All Users Request
  const getUsers = async ()=>{
    try{
      const userRes = await axios.get("http://localhost:5000/api/getUsers");
      setUsers(userRes.data)
      // console.log("Testing User data",userRes.data)
    } catch (err) { console.error(err.message); }
  }

  // Get All Instruments
  const getProducts = async ()=>{
    try{
      const userRes = await axios.get("http://localhost:5000/api/products");
      setUsers(userRes.data)
      // console.log("Testing ProductSs data",userRes.data)
    } catch (err) { console.error(err.message); }
  }

  useEffect(()=>{
    // Get All users
getUsers()
getProducts()
const interval=setInterval(async ()=>{
  await getUsers()
  await getProducts()
  },3000)

  return()=>clearInterval(interval)


 // Get All Instruments

    }, [])
  
  return (
    <div className="App" style={{ background: "#F8F5F2" }}>
      {/* Hello World */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account-register" element={<Register allUsers={users} />} />
        <Route path="/account-login" element={<Login allUsers={users} />} />
        <Route path="/account-forgotPassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
