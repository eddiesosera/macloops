import React from "react";

export const Navbar = () => {
  const screens = [
    {
      screenTitle: "Ptoducts",
      screenPath: "/products",
      iconActive: "ri-user-3-line",
      iconDeActive: "ri-user-3-line"
    }
  ];
  return (
    <div>
      <div className="navbar_left">
        <img src="" alt="" />
        <ul className="navbar_left_pages">{}</ul>
      </div>
      Navbar
      <i class="ri-layout-grid-line" />
    </div>
  );
};
