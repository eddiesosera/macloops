import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './style/card.css'

export const Card = ({ product }) => {
  const navigate = useNavigate()
  const [cardTgl, setCardTgl] = useState(false)
  const [likedTgl, setHeartTgl] = useState(false);
  const [addToCartTgl, setAddToCartTgl] = useState(false);


  // Functions
  // On like product
  const likeProduct = () => {
    setHeartTgl(!likedTgl)
  }

  // On add to cart
  const addToCart = () => {
    setAddToCartTgl(!addToCartTgl)
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
    <div style={{ zIndex: cardTgl ? 2 : 0, outline: cardTgl ? '#9ba2a4 solid 1px' : '', background: '#FFFBF6', border: 'solid 0.75px #E9E6E1', width: '240px', boxShadow: cardTgl ? '0px 8px 16px -5px #6F6D6A' : '', transition: 'box-shadow 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} onMouseEnter={e => setCardTgl(true)} onMouseLeave={e => setCardTgl(false)}>
      <NavLink style={{ display: 'block', width: '241px', height: '376px', position: 'absolute' }} to={'/product-page/' + product?.id}></NavLink>
      <div className="card_top_wrap" style={{ background: '#EDEAE6', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <img onClick={e => navigate('/product-page/' + product?.id)} src={product?.image_cover} alt='Product Image' style={{ zIndex: cardTgl ? 1 : 0, height: cardTgl ? '260px' : "240px", width: cardTgl ? '260px' : "240px", objectFit: 'contain', cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.25,0.75,0.5,1) 0s' }} />
        <div className="card_top_btn" onClick={e => likeProduct()} style={{ zIndex: '1', height: '36px', width: '36px', background: '#F7E9EA', borderRadius: '36px', display: 'flex', opacity: likedActive(false, true), justifyContent: 'center', alignItems: 'center', color: '#E50E21', border: '1px solid #FFFBF6', cursor: 'pointer', position: 'absolute', marginRight: '20px', marginBottom: '20px', transition: 'opacity 0.58s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
          <i className={likedTgl ? 'ph-fill ph-heart' : 'ph-bold ph-heart'} style={{ fontSize: '20px' }} />
        </div>
      </div>
      <div className="card_btm_wrap" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '700' }}>{product?.name}</div>
        <div style={{ color: '#6F6D6A', fontFamily: 'Nunito Sans', fontSize: '14px' }}>{product?.manufacturer}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '14px' }}>{'R ' + product?.price}</div>
          <div onClick={e => addToCart()} style={{ zIndex: cardTgl ? 2 : 1, height: '36px', width: '36px', borderRadius: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#EAF6F9', color: '#2293B6', cursor: 'pointer' }}><i className={addToCartTgl ? 'ph-fill ph-shopping-cart-simple' : 'ph-bold ph-plus'} /></div>
        </div>
      </div>
    </div>
  );
};
