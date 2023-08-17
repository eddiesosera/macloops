import React, { useContext, useEffect } from "react";
import { Hero } from "../sections/hero";
import { Sale } from "../sections/home_sale";
import axios from "axios";
import { LoginContext } from "../../App";

export const Home = ({ allProducts, allUsers }) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  useEffect(() => {
    // axios.get('http://localhost:5000/api/getUsers')
    //   .then((res) => {
    //     // console.log(res)
    //   }, [loggedIn])
  })
  return (
    <div style={{ padding: "0px 0px" }}>
      {/* <Hero /> */}
      <Sale sale_products={allProducts} />
    </div>
  );
};
