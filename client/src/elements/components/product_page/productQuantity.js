import React, { useState } from 'react'

export const ProductQuantity = () => {
    const [productQty, setProductQty] = useState(1)

    const decreaseQty = () => {
        setProductQty(productQty - 1);
        productQty <= 0 && setProductQty(0);
    }

    const increaseQty = () => {
        setProductQty(productQty + 1);
    }


    return (
        <div className='productQuantity_wrap' style={{ border: "1px solid #333", display: 'flex', width: 'fit-content' }}>
            <div className='productQuantity_label'>Qty:</div>
            <div className='p_qty_divider' style={{ borderRight: '1px solid #333' }}></div>
            <div className='productQuantity_interact_wrap' style={{ display: 'flex' }}>
                <div className='product_qty_decrease'
                    onClick={e => {
                        decreaseQty()
                    }
                    }><i class="ri-subtract-line"></i></div>
                <div className='product_qty_decrease'>{productQty}</div>
                <div className='product_qty_decrease'
                    onClick={e => increaseQty()}
                ><i class="ri-add-line"></i></div>
            </div>
        </div >
    )
}
