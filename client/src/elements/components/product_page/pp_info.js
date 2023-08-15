import React from 'react'
import { PRating } from './pp_rating'
import { ProductQuantity } from './productQuantity'

export const PPInfo = ({ productInfo }) => {
    return (
        <div>
            <div className='info_group_1'>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat' }}>{productInfo?.name}</div>
                <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.slogan}</div>
            </div>
            <div className='info_group_2'>
                <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans' }}>{productInfo?.manufacturer}</div>
                {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
            </div>
            <div className='info_group_2'>
                <PRating p_rating={productInfo?.rating} />
            </div>
            <div className='info_group_3_interaction' style={{ display: 'flex', gap: '20px' }}>
                <ProductQuantity />
                <button className='add_btn' style={{ display: 'flex' }}><i className='ph-fill ph-shopping-cart-simple' /><div>Add to Cart</div></button>
                <div className='like_btn_wrap'><i className='ph-fill ph-heart' /></div>
            </div>
            <div className='info_group_4_admin' style={{ display: 'flex', gap: '20px' }}>
                <button style={{ display: 'flex' }}>
                    <i className='ph ph-pencil-simple' />
                    <div>Edit Product</div>
                </button>
                <button style={{ display: 'flex' }}>
                    <i className='ph ph-trash' />
                    <div>Delete Product</div>
                </button>
            </div>
        </div>
    )
}
