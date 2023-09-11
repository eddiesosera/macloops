import React, { useEffect } from "react";
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import { ProductQuantity } from "../../../components/product_page/productQuantity";


export const Cart = ({ userObj, allProducts }) => {
  const getCartItems = userObj?.cart_items
  function findCartItems(products, cartItems) {
    const inCart = [];

    for (const cartItem of cartItems) {
      const matchingProduct = products.find((product) => product._id === cartItem.product_id);

      if (matchingProduct) {
        inCart.push({
          ...matchingProduct
        });
      }
    }

    return inCart;
  };
  const cartItems = findCartItems(allProducts, getCartItems);

  useEffect(() => {
    console.log(allProducts);
    console.log(getCartItems);
    console.log(findCartItems(allProducts, getCartItems))
  }, [userObj, allProducts, getCartItems])


  return (
    <div style={{ padding: '60px' }}>
      <div className="cart_top_section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>Cart</div>
        <button style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#2293B6", background: '#EAF6F9',
          border: '0.75px solid #C3E1E9', width: 'fit-content', height: "40px", padding: '0 20px', gap: "10px"
        }}
          onClick={e => { alert("CheckOut") }}>
          <i className="ph-bold ph-shopping-cart-simple" style={{ fontSize: '20px' }} />
          <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Checkout</div>
        </button>
      </div>
      <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column', padding: 0 }}>
        <Slide cascade damping={0.01}>
          {
            cartItems.map((cartItm, index) => {
              return (
                <li key={uuidv1()} style={{ display: 'flex', background: '#FFFBF6', border: 'solid 1px #E9E6E1', width: '100%', height: '140px', transition: 'all 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} >
                  <NavLink style={{ display: 'flex', padding: '20px 40px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div className="cart_item_section_0_index">{index + 1}</div>
                      <img src={cartItm?.image_cover} className="cart_item_section_1_image" style={{ height: '80px', width: '80px', objectFit: 'cover', border: '1px solid #E8E1D7' }} />
                    </div>
                    <div className="cart_item_section_2_name" style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase' }}>{cartItm?.name}</div>
                    <div className="cart_item_section_3_price">{cartItm?.price}</div>
                    <div className="cart_item_section_4_quantity"><ProductQuantity /></div>
                    <div className="cart_item_section_5_delete"><i className="ph-bold ph-trash" style={{ fontSize: '20px', color: '#E50E21' }} /></div>
                  </NavLink>
                </li>
              )
            })
          }
        </Slide>
      </ul>
    </div>)
};
