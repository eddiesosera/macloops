import React from "react";

export const Card = ({ img, title, type, price, star, linkToItem }) => {
  return (
    <div>
      <img src={img} alt={img} style={{ height: "300px", width: "300px" }} />
      <div className="meta">
        <div>{title}</div>
        <div>{type}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};
