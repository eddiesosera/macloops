import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const likedActive = () => {
    if (cardTgl) {
      return "flex"
    } else if (likedTgl) {
      return "flex"
    } else {
      return "none"
    }
  }


  return (
    <div style={{ background: '#FFFBF6', border: 'solid 0.75px #E9E6E1', width: '240px', boxShadow: cardTgl ? '0px 8px 16px -5px #6F6D6A' : '' }} onMouseEnter={e => setCardTgl(true)} onMouseLeave={e => setCardTgl(false)}>
      <div className="card_top_wrap" style={{ background: '#EDEAE6', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <img onClick={e => navigate('product-page?id=' + product?.id)} src={product?.image_cover} alt='Product Image' style={{ height: "240px", width: "240px", objectFit: 'contain', cursor: 'pointer' }} />
        <div className="card_top_btn" onClick={e => likeProduct()} style={{ height: '36px', width: '36px', background: '#F7E9EA', borderRadius: '36px', display: likedActive(), justifyContent: 'center', alignItems: 'center', color: '#E50E21', border: '1px solid #FFFBF6', cursor: 'pointer', position: 'absolute', marginRight: '20px', marginTop: '20px' }}>
          <i className={likedTgl ? 'ph-fill ph-heart' : 'ph-bold ph-heart'} style={{ fontSize: '20px' }} />
        </div>
      </div>
      <div className="card_btm_wrap" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '700' }}>{product?.name}</div>
        <div style={{ color: '#6F6D6A', fontFamily: 'Nunito Sans', fontSize: '14px' }}>{product?.manufacturer}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '14px' }}>{'R ' + product?.price}</div>
          <div onClick={e => addToCart()} style={{ height: '36px', width: '36px', borderRadius: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#EAF6F9', color: '#2293B6', cursor: 'pointer' }}><i className={addToCartTgl ? 'ph-fill ph-shopping-cart-simple' : 'ph-bold ph-plus'} /></div>
        </div>
      </div>
    </div>
  );
};
