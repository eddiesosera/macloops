import React, { useEffect } from "react";
import { Card } from "../components/card";
import './style/home_sale.css'
import Masonry from "react-responsive-masonry";
import { v1 as uuidv1 } from 'uuid';

export const Sale = ({ sale_products }) => {

  return (
    <div style={{ padding: '40px 60px' }}>
      <Masonry columnsCount={window.screen.width > 770 ? 5 : 1} gutter="30px" style={{ zIndex: '1' }}>
        {sale_products.map((sale, index) => {
          if (index < 5) {
            return (<li key={uuidv1()} style={{ listStyle: 'none', padding: 0 }}><Card product={sale} /></li>)
          };
        })}
      </Masonry>
    </div>
  );
};
