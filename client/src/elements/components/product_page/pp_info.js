import React from 'react'
import { PRating } from './pp_rating'
import { ProductQuantity } from './productQuantity'

export const PPInfo = ({ productInfo }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div className='info_group_1' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '700', color: '#13120F' }}>{productInfo?.name}</div>
                <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans', fontWeight: '400', color: '#6F6D6A' }}>{productInfo?.slogan}</div>
            </div>
            <div className='info_group_2' >
                <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '400', color: '#6F6D6A' }}>{productInfo?.manufacturer}</div>
                {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
            </div>
            <div className='info_group_3'>
                <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '700', color: '#13120F' }}>R {productInfo?.price}</div>
                {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
            </div>
            <div className='info_group_4'>
                <PRating p_rating={productInfo?.rating} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className='info_group_4_interaction' style={{ display: 'flex', gap: '20px' }}>
                    <ProductQuantity />
                    <button className='add_btn' style={{ display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: 'fit content', height: '40px', background: '#EAF6F9', color: '#2293B6', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <i className='ph-fill ph-shopping-cart-simple' style={{ fontSize: '20px' }} />
                        <div style={{ fontFamily: 'Montserrat', fontWeight: '600', color: '#2293B6' }}>Add to Cart</div>
                    </button>
                    <div className='like_btn_wrap' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7E9EA', border: "solid 0.75px #E9C3C6", color: '#E50E0E', height: '40px', width: "40px", cursor: 'pointer' }}><i className='ph-fill ph-heart' style={{ fontSize: '20px' }} /></div>
                </div>
                {/* Only admins can access this section */}
                <div className='info_group_5_admin' style={{ display: 'flex', gap: '20px' }}>
                    <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#875E0C", background: '#F9F4EA', border: '0.75px solid #E9DCC3', width: 'fit-content', height: "40px", padding: '0 20px', gap: "10px" }}>
                        <i className='ph ph-pencil-simple' style={{ fontSize: '20px', }} />
                        <div style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>Edit Product</div>
                    </button>
                    <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#875E0C', background: '#F9F4EA', border: '0.75px solid #E9DCC3', width: 'fit-content', height: "40px", padding: '0 20px', gap: '10px' }}>
                        <i className='ph ph-trash' style={{ fontSize: '20px', }} />
                        <div style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>Delete Product</div>
                    </button>
                </div>
            </div >
        </div >
    )
}
