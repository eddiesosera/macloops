import React, { useEffect, useState } from 'react';

export const ProductQuantity = ({ initValue, sendValue, addAction, subtractAction }) => {
    const initialQuantity = initValue || 1;
    const [productQty, setProductQty] = useState(initialQuantity);

    const decreaseQty = () => {
        setProductQty(productQty - 1);
        if (productQty <= 1) {
            setProductQty(1);
        }
    };

    const increaseQty = () => {
        setProductQty(productQty + 1);
        console.log(productQty);
    };

    useEffect(() => {
        sendValue(productQty);
    }, [sendValue, initValue]);

    return (
        <div className="productQuantity_wrap" style={{ border: '0.75px solid #BCA98C', display: 'flex', width: 'fit-content', transition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
            <div className="productQuantity_label" style={{ padding: '6px 9px', display: 'flex', color: '#4A4438', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '12px', alignItems: 'center' }}>Qty:</div>
            <div className="p_qty_divider" style={{ borderRight: '0.75px solid #BCA98C' }} />
            <div className="productQuantity_interact_wrap" style={{ display: 'flex', gap: '0px' }}>
                <div className="product_qty_decrease"
                    onClick={decreaseQty}
                    style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '20px', color: productQty <= 1 ? '#D0D6D8' : '#0F7FA2' }}>
                    <i className="ri-subtract-line"></i>
                </div>
                <div className="p_qty_divider" style={{ borderRight: '1px solid #eee' }} />
                <div className="product_qty_display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '15px', fontFamily: 'Nunito Sans', fontWeight: '600', padding: '6px 16px', cursor: 'pointer', transition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s' }}>
                    {productQty}
                </div>
                <div className="p_qty_divider" style={{ borderRight: '1px solid #ddd' }} />
                <div className="product_qty_increase"
                    onClick={increaseQty}
                    style={{ padding: '6px 12px', cursor: 'pointer', color: '#0F7FA2', fontSize: '20px' }}>
                    <i className="ri-add-line"></i>
                </div>
            </div>
        </div>
    );
};
