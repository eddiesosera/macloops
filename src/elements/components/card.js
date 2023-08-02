import React from "react";

export const Card = ({ img, title, type, price, star, linkToItem }) => {
  return (
    <div>
      <img src={img} alt={img} />
      <div className="meta" />
    </div>
  );
};
