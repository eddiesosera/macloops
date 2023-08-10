import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ product, img, title, type, price, star, linkToItem }) => {
  const navigate = useNavigate()
  return (
    <div onClick={e => navigate('product-page?id=' + product?.id)} >
      <img src={img} alt={img} style={{ height: "300px", width: "300px" }} />
      <div className="meta">
        <div>{product?.title}</div>
        <div>{product?.type}</div>
        <div>{product?.price}</div>
        <div>{<div>{product?.price}</div>}</div>
      </div>
    </div>
  );
};
