import React, { useEffect, useState } from "react";
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import { ProductQuantity } from "../../../components/product_page/productQuantity";
import axios from "axios";


export const Cart = ({ userObj, allProducts }) => {

  const navigate = useNavigate();
  const getCartItems = userObj?.cart_items;
  function findCartItems(products, cartItems) {
    const inCart = [];

    for (const cartItem of cartItems) {
      const matchingProduct = products.find((product) => product?._id === cartItem?.product_id);

      if (matchingProduct) {
        inCart.push({
          ...matchingProduct
        });
      }
    }

    return inCart;
  };
  const cartItems = findCartItems(allProducts, getCartItems);

  const currencyFormat = (amount) => {
    return (amount.toLocaleString('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2, // Optional: specify the number of decimal places
    })
    ).replace(/,/g, '.')
  };

  const initQtyChecker = (cartIndex) => {

    let productId = cartItems[cartIndex]._id

    if (userObj?.cart_items.length > 0) {
      for (let i = 0; allProducts.length > i; i++) {
        if (userObj?.cart_items[i].product_id === productId) {
          // alert(productId)
          return userObj?.cart_items[i].quantity
        } else {
          return 1
        }
      }
    }
  };

  const [qtyValue, setQtyValue] = useState(1);
  const getQtyValue = (val) => {
    setQtyValue(val);
    console.log("qty: " + qtyValue)
  }

  useEffect(() => {
    console.log(allProducts);
    console.log({ items: getCartItems });
    console.log(findCartItems(allProducts, getCartItems))
    console.log(currencyFormat(1234))
  }, [userObj, allProducts, getCartItems]);

  const checkoutAction = () => {
    alert("CheckOut");

    let order = { items: getCartItems }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/createOrder',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: order
    };

    axios.request(config)
      .then((response) => {
        console.log('checkout-success', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div style={{ padding: '60px' }}>
      <div className="cart_top_section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>Cart</div>
        <button style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#2293B6", background: '#EAF6F9',
          border: '0.75px solid #C3E1E9', width: 'fit-content', height: "40px", padding: '0 20px', gap: "10px"
        }}
          onClick={checkoutAction}>
          <i className="ph-bold ph-shopping-cart-simple" style={{ fontSize: '20px' }} />
          <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Checkout</div>
        </button>
      </div>
      <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column', padding: 0 }}>
        {/* <Slide cascade damping={0.01}> */}
        {
          cartItems.map((cartItm, index) => {
            return (
              <li key={uuidv1()} style={{ display: 'flex', background: '#FFFBF6', color: '#13120F', border: 'solid 1px #E9E6E1', width: '100%', height: '140px', transition: 'all 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} >
                <div style={{ display: 'flex', padding: '20px 40px', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'context-menu' }}>
                  <div className="cart_item_section_00_leftWrap" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397' }}>{index + 1}</div>
                    <img src={cartItm?.image_cover} className="cart_item_section_1_image" style={{ height: '80px', width: '80px', objectFit: 'cover', border: '1px solid #E8E1D7', cursor: 'pointer' }}
                      onClick={e => {
                        navigate('/product-page/' + cartItm?._id)
                        localStorage.setItem('last_prod_viewed', JSON.stringify(cartItm));
                        localStorage.getItem('last_prod_id') === "" && localStorage.setItem('last_prod_id', cartItm?._id);
                      }}
                    />
                  </div>
                  <div className="cart_item_section_2_name" style={{ fontSize: '15px', fontWeight: '600', textTransform: 'uppercase' }}>{cartItm?.name}</div>
                  <div className="cart_item_section_3_price" style={{ fontSize: '15px', fontWeight: '700', }}>{
                    currencyFormat(Number(cartItm?.price))
                  }</div>
                  <div className="cart_item_section_4_quantity"><ProductQuantity sendValue={getQtyValue} /></div>
                  <div className="cart_item_section_5_delete"><i className="ph-bold ph-trash" style={{ fontSize: '20px', color: '#E50E21' }} /></div>
                </div>
              </li>
            )
          })
        }
        {/* </Slide> */}
      </ul>
    </div>)
};
