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
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faFutbol, faCodeCompare, faCircleHalfStroke, faChartLine } from "@fortawesome/free-solid-svg-icons";
// import anime from 'animejs/lib/anime.es.js';
// import Swiper JS
// import Swiper from 'swiper';
// import 'swiper/css';

function App() {
  return (
    <div className="App">
      {/* Hello World */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account-register" element={<Register />} />
        <Route path="/account-login" element={<Login />} />
        <Route path="/account-forgotPassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
