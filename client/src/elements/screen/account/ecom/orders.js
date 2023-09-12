import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';

export const Orders = ({ userObj, allProducts }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const findOrderItems = (products, orders) => {
        const productMap = new Map();
        const inCart = [];

        // Create a map for faster product lookup
        for (const product of products) {
            productMap.set(product._id, product);
        }

        for (const order of orders) {
            for (const item of order.items) {
                const matchingProduct = productMap.get(item.product_id);

                if (matchingProduct) {
                    inCart.push({
                        products: [...products],
                        order: { ...order }
                    });
                }
            }
        }

        return inCart;
    };
    const orderItems = findOrderItems(allProducts, orders);

    const findProduct = (id) => {

        if (orderItems?.products?.length > 0) {

            for (let i = 0; orderItems?.length > i; i++) {
                if (orderItems?.products[i]?._id === id) {
                    return orderItems?.products[i]
                }
            }
        }
    }

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
                // console.log(orders)
                // console.log(response)

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
        // console.log(orders);
        // console.log(allProducts);
        // console.log('order-items-found', orderItems)
        // console.log("orderitms: ", orderItems)
    }, []);

    return (
        <div style={{ padding: '60px' }}>
            <div className="orders_top_section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        Orders
                        <div style={{ color: '#aba397', fontWeight: '500', fontFamily: 'Inter' }}>({orderItems?.length})</div>
                    </div>
                </div>
            </div>
            <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column', padding: 0 }}>
                {/* <Slide cascade damping={0.01}> */}
                {
                    orderItems.map((cartItm, index) => {
                        return (
                            <li key={uuidv1()} style={{ display: 'flex', padding: '40px 40px', alignItems: 'flex-end', justifyContent: 'space-between', background: '#FFFBF6', color: '#13120F', border: 'solid 1px #E9E6E1', width: '100%', maxWidth: '1100px', height: '100%', transition: 'all 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} >
                                <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397' }}>#{index + 1}</div>
                                <ul style={{ display: 'flex', flexDirection: "row" }}>
                                    {
                                        cartItm?.order?.items?.map((itemInOrder, i) => {
                                            console.log(itemInOrder?.product_id)
                                            return (
                                                <li style={{ display: 'flex', padding: '20px 40px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '20px', width: '100%', cursor: 'context-menu', }}>
                                                    <div className="cart_item_section_00_leftWrap" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                                                        <div src={''} className="cart_item_section_1_image"
                                                            style={{ width: '100%', objectFit: 'cover', fontSize: '10px', fontWeight: '800', border: '1px solid #E8E1D7', cursor: 'pointer' }}
                                                            onClick={e => {
                                                                navigate('/product-page/' + cartItm?._id)
                                                                localStorage.setItem('last_prod_viewed', JSON.stringify(cartItm));
                                                                localStorage.getItem('last_prod_id') === "" && localStorage.setItem('last_prod_id', cartItm?._id);
                                                            }}
                                                        >
                                                            {itemInOrder?.product_id}
                                                        </div>
                                                    </div>
                                                    <div className="cart_item_section_2_name" style={{ fontSize: '15px', fontWeight: '600', textTransform: 'uppercase' }}>{cartItm?.name}</div>
                                                    <div className="cart_item_section_3_price" style={{ fontSize: '15px', fontWeight: '700', }}>{
                                                        currencyFormat(Number(cartItm?.price))
                                                    }</div>
                                                    <div className="cart_item_section_4_quantity">{itemInOrder?.quantity} item</div>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                                <div className="cart_item_section_5_delete"
                                    onClick={e => { console.log("orderitms: ", orderItems) }}
                                ><i className="ph-bold ph-trash" style={{ fontSize: '20px', color: '#E50E21' }} /></div>
                            </li>
                        )
                    })
                }
                {/* </Slide> */}
            </ul>
        </div>
    )
}
