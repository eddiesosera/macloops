import React, { useState } from 'react'

export const ProductQuantity = () => {
    const [productQty, setProductQty] = useState(1)

    const decreaseQty = () => {
        if (productQty <= 1) {
            setProductQty(1);
        } else {
            setProductQty(productQty - 1);
        }
    }

    const increaseQty = () => {
        setProductQty(productQty + 1);
    }


    return (
        <div className='productQuantity_wrap' style={{ border: "0.75px solid #BCA98C", display: 'flex', width: 'fit-content', transition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
            <div className='productQuantity_label' style={{ padding: '6px', display: 'flex', color: '#4A4438', fontFamily: 'Montserrat', fontWeight: '500' }}>Qty:</div>
            <div className='p_qty_divider' style={{ borderRight: '0.75px solid #BCA98C' }} />
            <div className='productQuantity_interact_wrap' style={{ display: 'flex', gap: '0px', }}>
                <div className='product_qty_decrease'
                    onClick={e => { decreaseQty() }} style={{ padding: "6px 12px", cursor: 'pointer', fontSize: '20px', color: productQty < 2 ? '#D0D6D8' : '#0F7FA2' }}>
                    <i class="ri-subtract-line"></i>
                </div>
                <div className='p_qty_divider' style={{ borderRight: '1px solid #eee' }} />
                <div className='product_qty_decrease' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Nunito Sans', fontWeight: '600', padding: "6px 16px", cursor: 'pointer', ransition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
                    {productQty}
                </div>
                <div className='p_qty_divider' style={{ borderRight: '1px solid #ddd' }} />
                <div className='product_qty_increase'
                    onClick={e => increaseQty()} style={{ padding: "6px 12px", cursor: 'pointer', color: '#0F7FA2', fontSize: '20px' }}>
                    <i class="ri-add-line"></i>
                </div>
            </div>
        </div >
    )
}
