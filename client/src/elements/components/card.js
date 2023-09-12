import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './style/card.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSpring, animated } from '@react-spring/web';
import anime from 'animejs/lib/anime.es.js';
import axios from "axios";

export const Card = ({ product, user }) => {
  const navigate = useNavigate();
  const [cardTgl, setCardTgl] = useState(false);
  const [likedTgl, setHeartTgl] = useState(false);
  const [addToCartTgl, setAddToCartTgl] = useState(false);
  const [productId, setProductId] = useState(product?._id);
  const getUser = JSON.parse(sessionStorage.getItem('user'))
  const getUserId = getUser?._id
  const existingCartItems = getUser?.cart_items;
  const existingLikedItems = getUser?.liked_items;
  let newcartItems = {};
  let newLikedItems = {};


  // ANIMATION
  const [state, toggle] = useState(true)
  // const { x } = useSpring({
  //   from: { x: 0 },
  //   x: state ? 1 : 0,
  //   config: { duration: 1000 },
  // })


  useEffect(() => {
    setProductId(product?._id);

    // Add to Cart front and back logic
    for (let itm = 0; existingCartItems?.length > itm; itm++) {
      if (existingCartItems[itm]?.product_id === productId) {
        setAddToCartTgl(true)
      }
    };

    // Liked Item front and back logic
    for (let lkd = 0; existingLikedItems?.length >= lkd; lkd++) {
      if (existingLikedItems[lkd]?.product_id === productId) {
        setHeartTgl(true)
      }
    };

  }, [getUser, product, productId, newcartItems, newLikedItems, existingCartItems, existingLikedItems, likedTgl, addToCartTgl])


  const addToCartNotify = () => toast(
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '10px' }}>
      <img src={product?.image_cover} style={{ height: '40px', width: '40px', objectFit: 'contain', border: '0.75px solid #BFBBB5' }} />
      <div className="product_deets_wrap" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="notify_message" style={{ fontFamily: 'Nunito Sans' }}>
          You've {addToCartTgl ? 'removed' : 'added'} <b>{product?.name}</b>  {addToCartTgl ? 'from' : 'to'} your cart!
        </div>
        {
          addToCartTgl ? '' : (<button onClick={e => navigate('/cart')} className='add_btn' style={{ display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: 'fit content', maxWidth: '150px', height: '40px', background: '#EAF6F9', color: '#2293B6', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <i className='ph-fill ph-shopping-cart-simple' style={{ fontSize: '20px' }} />
            <div style={{ fontFamily: 'Montserrat', fontWeight: '600', color: '#2293B6' }}>View Cart</div>
          </button>)
        }
      </div>
    </div>
  );


  // FUNCTIONS
  // 
  const addAndUpdateCart = (cartItems, newItem) => {
    // Check if the newItem's product_id already exists in cartItems
    const existingItemIndex = cartItems.findIndex(item => item.product_id === newItem.product_id);

    if (existingItemIndex !== -1) {
      // If the product_id exists, remove the existing item
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(existingItemIndex, 1);
      setAddToCartTgl(false)
      return updatedCartItems;
    } else {
      // If the product_id doesn't exist, add the new item to the cartItems
      return [...cartItems, newItem];
    }
  }

  // 
  const addAndUpdateLikes = (likedItems, newItem) => {
    // Check if the newItem's product_id already exists in cartItems
    const existingItemIndex = likedItems.findIndex(item => item.product_id === newItem.product_id);

    if (existingItemIndex !== -1) {
      // If the product_id exists, remove the existing item
      const updatedLikedItems = [...likedItems];
      updatedLikedItems.splice(existingItemIndex, 1);
      setHeartTgl(false)
      return updatedLikedItems;
    } else {
      // If the product_id doesn't exist, add the new item to the cartItems
      return [...likedItems, newItem];
    }
  }


  // On like product
  const likeProduct = () => {

    newLikedItems = { ...newLikedItems, product_id: productId };
    const updated_likes = { liked_items: addAndUpdateLikes(existingLikedItems, newLikedItems) };

    // add to cart axios call
    axios.patch('http://localhost:5000/api/updateUser/' + getUserId, updated_likes)
      .then((updatedLikes) => {
        const updatedUserLike = updatedLikes?.data
        sessionStorage.setItem("user", JSON.stringify(updatedUserLike));

        // Update button if the item is not found
        for (let lkd = 0; existingLikedItems?.length >= lkd; lkd++) {
          if (existingLikedItems[lkd]?.product_id === productId) {
            setHeartTgl(true);
          };
        }
      })
      .catch(err => console.error(err))

  }

  // On add to cart
  const addToCart = () => {

    newcartItems = { ...newcartItems, product_id: productId, ...newcartItems, quantity: 1 };
    const updated_cart = { cart_items: addAndUpdateCart(existingCartItems, newcartItems) };

    // add to cart axios call
    axios.patch('http://localhost:5000/api/updateUser/' + getUserId, updated_cart)
      .then((updatedCart) => {
        const updatedUser = updatedCart?.data
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Update button if the item is not found
        for (let itm = 0; existingCartItems?.length > itm; itm++) {
          if (existingCartItems[itm]?.product_id === productId) {
            setAddToCartTgl(true)
          };
        };

        addToCartNotify()

      })
      .catch(err => console.error(err))

  }


  // Like
  const likedActive = (display, opacity) => {
    if (display) {
      if (cardTgl) {
        return "flex"
      } else if (likedTgl) {
        return "flex"
      } else {
        return "none"
      }
    } else if (opacity) {
      if (cardTgl) {
        return 1
      } else if (likedTgl) {
        return 1
      } else {
        return 0
      }
    }

  }


  return (
    <div className="card" style={{ zIndex: cardTgl ? 2 : 0, outline: cardTgl ? '#b8c6ca solid 1px' : '', background: '#FFFBF6', border: 'solid 0.75px #E9E6E1', width: '240px', boxShadow: cardTgl ? '0px 8px 16px -5px #6F6D6A' : '', transition: 'box-shadow 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} onMouseEnter={e => setCardTgl(true)} onMouseLeave={e => setCardTgl(false)}
      onClick={e => {
        localStorage.setItem('last_prod_viewed', JSON.stringify(product));
        localStorage.getItem('last_prod_id') === "" && localStorage.setItem('last_prod_id', product?._id);
      }}>
      <ToastContainer hideProgressBar={true} style={{ zIndex: '5' }} />
      <NavLink style={{ display: 'block', width: '241px', height: '376px', position: 'absolute' }} to={('/product-page/' + productId)}
      ></NavLink>
      <div className="card_top_wrap" style={{ background: '#EDEAE6', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <img onClick={e => navigate('/product-page/' + productId)} src={product?.image_cover} alt='Product Image' style={{ zIndex: cardTgl ? 1 : 0, height: cardTgl ? '260px' : "240px", width: cardTgl ? '260px' : "240px", objectFit: 'contain', cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.25,0.75,0.5,1) 0s' }} />

        <animated.div
          style={{
            // opacity: x.to({ range: [0, 1], outpust: [1, 1] }),
            // scale: x.to({
            //   range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            //   output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],}), 
            zIndex: '1', position: 'absolute', marginRight: '20px', marginBottom: '20px', height: '36px', width: '36px'
          }} onClick={e => toggle(!state)}>
          <div className="card_top_btn" onClick={e => { getUser ? likeProduct() : alert('Login to Save Items'); }}
            style={{
              zIndex: '1', height: '36px', width: '36px', background: '#F7E9EA', borderRadius: '36px', display: 'flex',
              opacity: likedActive(false, true), justifyContent: 'center', alignItems: 'center', color: '#E50E21',
              border: '1px solid #FFFBF6', cursor: 'pointer', position: 'absolute', marginRight: '20px', marginBottom: '20px',
              transition: 'opacity 0.58s cubic-bezier(0.25,0.75,0.5,1) 0s'
            }}
          >
            <i className={likedTgl ? 'ph-fill ph-heart' : 'ph-bold ph-heart'} style={{ fontSize: '20px' }} />
          </div>
        </animated.div>

      </div >
      <div className="card_btm_wrap" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '700' }}>{product?.name}</div>
        <div style={{ color: '#6F6D6A', fontFamily: 'Nunito Sans', fontSize: '14px' }}>{product?.manufacturer}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '14px' }}>{'R ' + product?.price}</div>

          <div onClick={e => toggle(!state)} style={{ zIndex: cardTgl ? 2 : 1 }}>
            <animated.div
              style={{
                // opacity: x.to({ range: [0, 1], output: [1, 1] }),
                // scale: x.to({
                //   range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                //   output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],}),
              }} >
              <div onClick={e => { getUser ? addToCart() : alert('Login to add items to Cart'); }} style={{ zIndex: cardTgl ? 2 : 1, height: '36px', width: '36px', borderRadius: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: addToCartTgl ? '#13120F' : '#f6f0e6', color: addToCartTgl ? '#f9f4eb' : '#6e480f', cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
                <i className={addToCartTgl ? 'ph-fill ph-shopping-cart-simple' : 'ph-bold ph-plus'} />
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </div >
  );
};
