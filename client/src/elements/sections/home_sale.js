import React from "react";
import { Card } from "../components/card";

export const Sale = ({ sale_products }) => {

  return (
    <ul style={{ display: "flex" }}>
      {sale_products.map(sale => {
        return <li key={sale.imgsrc}><Card product={sale} /></li>;
      })}
    </ul>
  );
};
