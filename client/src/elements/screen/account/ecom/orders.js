import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';

export const Orders = ({ userObj, allProducts }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    function findOrderItems(products, orders) {
        const inCart = [];

        for (const order of orders) {
            for (let i = 0; orders.length > i; i++) {
                const matchingProduct = products.find((product) => product?._id === order?.items[i]?.product_id);

                if (matchingProduct) {
                    inCart.push({
                        ...matchingProduct, ...order?.customer
                    });
                }
            }
        }

        return inCart;
    };
    const orderItems = findOrderItems(allProducts, orders);

    const getOrders = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/orders',
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
            }
        };

        axios.request(config)
            .then((response) => {

                setOrders(response.data);
                console.log(orders)
                console.log(response)

                sessionStorage.setItem('order-length', response.data.length);
                let order_length = response.data.length;
                let session_order_length = Number(sessionStorage.getItem('order-length'))

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const currencyFormat = (amount) => {
        return (amount.toLocaleString('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 2, // Optional: specify the number of decimal places
        })
        ).replace(/,/g, '.')
    };

    useEffect(() => {
        getOrders();
        console.log(orders);
        console.log(allProducts);
        console.log('order-items-found', orderItems)
    }, [orders]);

    return (
        <div style={{ padding: '60px' }}>
            <div className="orders_top_section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        Orders
                        <div style={{ color: '#aba397', fontWeight: '500' }}>({orderItems?.length})</div>
                    </div>
                </div>
            </div>
            <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column', padding: 0 }}>
                {/* <Slide cascade damping={0.01}> */}
                {
                    orderItems.map((cartItm, index) => {
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
                                    <div className="cart_item_section_4_quantity">1 item</div>
                                    <div className="cart_item_section_5_delete"><i className="ph-bold ph-trash" style={{ fontSize: '20px', color: '#E50E21' }} /></div>
                                </div>
                            </li>
                        )
                    })
                }
                {/* </Slide> */}
            </ul>
        </div>
    )
}
