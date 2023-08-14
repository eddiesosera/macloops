import React from "react";
import { Card } from "../components/card";
import './style/home_sale.css'

export const Sale = ({ sale_products }) => {

  return (
    <ul className="home_sale_wrap" style={{ display: "flex", padding: '40px', gap: '40px' }}>
      {sale_products.map(sale => {
        return <li key={sale.imgsrc} style={{ listStyle: 'none', padding: 0 }}><Card product={sale} /></li>;
      })}
    </ul>
  );
};
