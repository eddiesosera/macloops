import React, { useEffect } from "react";
import { Hero } from "../sections/hero";
import { Sale } from "../sections/home_sale";
import axios from "axios";

export const Home = ({allPosts, allUsers}) => {
  useEffect(()=>{
    axios.get('http://localhost:5000/api/getUsers')
    .then((res)=>{
console.log(res)
    })
  })
  return (
    <div style={{ padding: "0px 0px" }}>
      <Hero />
      <Sale />
    </div>
  );
};
