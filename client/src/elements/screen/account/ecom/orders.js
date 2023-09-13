import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from "react-dom/server";
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import { Search } from '../../../components/search';
import jsPDF from 'jspdf';

export const Orders = ({ userObj, allProducts }) => {
    const [selectedState, setSelectedState] = useState("All");
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [searchQuery1, setSearchQuery1] = useState("")

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

    function filterOrdersByStatus(ordrs, filter) {
        return ordrs.filter(order => order?.orderStatus === filter);
    };

    function filterItemsBySearchQuery(items, searchQuery) {
        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexPattern = new RegExp(escapedQuery, 'i');

        function searchObject(obj) {
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value === 'string' && regexPattern.test(value)) {
                        return true;
                    } else if (typeof value === 'object' && !Array.isArray(value)) {
                        if (searchObject(value)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        return items.filter(item => searchObject(item));
    };

    const getOrders = (filter, search) => {
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

                setAllOrders(response.data)

                if (selectedState === "All") {
                    if (searchQuery1 !== "") {
                        setOrders(filterItemsBySearchQuery(response.data, searchQuery1))
                    } else {
                        setOrders(allOrders);
                    }
                } else if (searchQuery1 !== "") {
                    setOrders(filterItemsBySearchQuery(response.data, searchQuery1))
                } else {
                    if (Array.isArray(response.data)) {
                        setOrders(filterOrdersByStatus(response.data, filter))
                    } else {
                        console.error("orders is not an array.");
                    }
                }


                sessionStorage.setItem('order-length', response.data.length);
                let order_length = response.data.length;
                let session_order_length = Number(sessionStorage.getItem('order-length'))

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const productStates = [
        {
            state_id: 'all',
            state_name: 'All'
        },
        {
            state_id: 'pending',
            state_name: 'Pending'
        },
        {
            state_id: 'proccessed',
            state_name: 'Proccessed'
        },
        {
            state_id: 'delivered',
            state_name: 'Delivered'
        },
        {
            state_id: 'cancelled',
            state_name: 'Cancelled'
        }
    ];


    const returnDate = (originalDate) => {
        const date = new Date(originalDate);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate
    };
    const returnTime = (originalDate) => {
        const date = new Date(originalDate);

        // Round off the minutes to the nearest 30 minutes
        const minutes = Math.round(date.getMinutes() / 30) * 30;

        // Format the hours and minutes
        const hours = date.getHours();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return formattedTime
    };
    const returnMobileNumber = (originalNumber) => {

        // Remove the leading '+' character
        const numberWithoutPlus = originalNumber.substring(1);

        // Insert spaces at specific positions
        const formattedNumber = `+27 ${numberWithoutPlus.substring(0, 2)} ${numberWithoutPlus.substring(2, 5)} ${numberWithoutPlus.substring(5)}`;

        return formattedNumber

    };


    const getSearchQuery = (val) => {
        setSearchQuery1(val)
    }


    const orderActions = [
        {
            label: 'Process',
            icon: 'ph-bold ph-spinner-gap',
            action: (id) => {
                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `http://localhost:5000/api/updateOrder/${id}`,
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "orderStatus": "Proccessed"
                    }
                };

                axios.request(config)
                    .then((response) => {
                        alert("Proccessed");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            label: 'Deliver',
            icon: 'ph-bold ph-truck',
            action: (id) => {
                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `http://localhost:5000/api/updateOrder/${id}`,
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "orderStatus": "Delivered"
                    }
                };

                axios.request(config)
                    .then((response) => {
                        alert("Delivered");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            label: 'Cancel',
            icon: 'ph-bold ph-trash',
            action: (id) => {
                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `http://localhost:5000/api/updateOrder/${id}`,
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "orderStatus": "Cancelled"
                    }
                };

                axios.request(config)
                    .then((response) => {
                        alert("): Cancelled");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    ];


    useEffect(() => {

        getOrders(selectedState);
        if (searchQuery1 !== "") {
            setOrders(filterItemsBySearchQuery(orders, searchQuery1))
        }


    }, [searchQuery1, selectedState, orders]);


    return (
        <div style={{ padding: '60px' }}>
            <div className="orders_top_section" style={{ display: "flex", flexDirection: "column", marginBottom: '40px', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>
                        <div style={{ display: 'flex', fontSize: '48px', gap: '10px', alignItems: 'center' }}>
                            Orders
                            <div style={{ color: '#aba397', fontWeight: '400', fontFamily: 'Inter' }}>({orderItems?.length})</div>
                        </div>
                    </div>
                    <ul className="products_top_category_wrap" style={{ padding: 0, display: 'flex', gap: '10px', }}>
                        {
                            productStates.map((state, index) => {
                                return (
                                    <li className="product_state" key={uuidv1()} onClick={e => { setSelectedState(state?.state_name); getOrders(state?.state_name) }}
                                        style={{
                                            listStyle: 'none', padding: '12px', cursor: 'pointer', fontFamily: 'Nunito Sans', fontSize: '16px',
                                            fontWeight: selectedState === state?.state_name ? "900" : '700', color: selectedState === state?.state_name ? '#111' : '#999'
                                        }}
                                    >{state?.state_name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Search query={getSearchQuery} />
                {searchQuery1}
            </div>
            <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column', padding: 0 }}>
                {/* <Slide cascade damping={0.01}> */}
                {
                    orderItems.map((orderItm, index) => {
                        return (
                            <li key={uuidv1()} style={{ display: 'flex', flexDirection: 'column', padding: '40px 40px', gap: '20px', background: '#FFFBF6', color: '#13120F', border: 'solid 1px #E9E6E1', width: '100%', maxWidth: '1300px', height: '100%', transition: 'all 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} >
                                <div style={{ display: 'flex', gap: '40px' }}>
                                    <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397', display: 'flex', gap: '5px' }}>Order No: <div style={{ color: '#40372c' }}>#{orderItm?.order?._id}</div></div>
                                    <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397', display: 'flex', gap: '5px' }}>Status: <div style={{ color: '#40372c' }}>{orderItm?.order?.orderStatus}</div></div>
                                    <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397', display: 'flex', gap: '5px' }}>Delivery Date: <div style={{ color: '#40372c' }}>{returnDate(orderItm?.order?.deliveryDate)}</div></div>
                                    <div className="cart_item_section_0_index" style={{ fontSize: '13px', fontWeight: '500', color: '#ABA397', display: 'flex', gap: '5px' }}>Delivery Time: <div style={{ color: '#40372c' }}>{returnTime(orderItm?.order?.deliveryDate)}</div></div>
                                </div>
                                <div style={{ height: '0.3px', borderTop: '0.25px solid #E5DDD3', width: '-webkit-fill-available' }} ></div>
                                <ul style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', padding: 0, gap: '10px' }}>
                                    {
                                        orderItm?.order?.items?.map((itemInOrder, i, arr) => {
                                            return (
                                                <li style={{ display: 'flex', padding: '20px 40px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '10px', cursor: 'context-menu', border: 'solid 0.25px #D9CCB9' }}>
                                                    <div style={{ fontSize: '10px', color: '#6F6D6A' }}>Product {i + 1}</div>
                                                    <div src={''} className="cart_item_section_1_image"
                                                        style={{
                                                            width: 'fit-content', objectFit: 'cover', fontSize: '12px', fontWeight: '700', border: '1px solid #E0D3BF', cursor: 'pointer',
                                                            background: '#FFF5E5', color: '#40372C', padding: '4px 6px'
                                                        }} onClick={e => {
                                                            navigate('/product-page/' + orderItm?._id)
                                                            localStorage.setItem('last_prod_viewed', JSON.stringify(orderItm));
                                                            localStorage.getItem('last_prod_id') === "" && localStorage.setItem('last_prod_id', orderItm?._id);
                                                        }
                                                        }>
                                                        {itemInOrder?.product_id}
                                                    </div>
                                                    <div className="cart_item_section_2_name" style={{ fontSize: '15px', fontWeight: '600', textTransform: 'uppercase' }}>{orderItm?.name}</div>
                                                    <div className="cart_item_section_4_quantity" style={{ fontSize: '12px', fontWeight: '600' }}>{itemInOrder?.quantity} item</div>
                                                    {/* <div style={{ height: '100%', borderLeft: '1px solid red', width:'' }}></div> */}
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                                <div style={{ height: '0.3px', borderTop: '0.25px solid #E5DDD3', width: '-webkit-fill-available' }} ></div>

                                <div className='order_customer_section_wrap'
                                    style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', fontWeight: '600', color: '#40372c' }}>
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        {
                                            orderItm?.order?.customer?.profile_image !== "" ?
                                                <img style={{ height: '30px', width: '30px', objectFit: 'cover', border: '0.5px solid #e2ded9' }} onClick={e => console.log(orderItm?.order?.customer)} className='order_customer_section_left_img' src={orderItm?.order?.customer?.profile_image} />
                                                : <img style={{ height: '30px', width: '30px', objectFit: 'cover' }} onClick={e => console.log(orderItm?.order?.customer)} className='order_customer_section_left_img' src="https://ucarecdn.com/3cfda29f-3620-4ce6-b488-7f0757853c6d/" />
                                        }
                                        <div style={{ fontSize: '16px' }}>{orderItm?.order?.customer?.fullname}</div>
                                    </div>
                                    <div className='order_customer_section_right_details' style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <div style={{ fontWeight: '500', color: '#ABA397' }}>Adress:</div>
                                        <div style={{ fontSize: '16px' }}>
                                            <div> {orderItm?.order?.customer?.address?.house_number + " " + orderItm?.order?.customer?.address?.street_name}</div>
                                            <div>{orderItm?.order?.customer?.address?.city}</div>
                                            <div>{orderItm?.order?.customer?.address?.zip_code}</div>
                                        </div>
                                    </div>
                                    <div className='order_customer_section_right_details' style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <div style={{ fontWeight: '500', color: '#ABA397' }}>Contacts:</div>
                                        <div style={{ fontSize: '16px' }}>
                                            <div>{orderItm?.order?.customer?.email}</div>
                                            <div>{returnMobileNumber("+27" + orderItm?.order?.customer?.phone_number)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: '0.3px', borderTop: '0.25px solid #E5DDD3', width: '-webkit-fill-available' }} ></div>
                                <ul style={{ display: 'flex', gap: '20px', padding: 0 }}>
                                    {
                                        orderActions?.map((action, ind) => {
                                            return (
                                                <li key={ind} className='add_btn' onClick={e => { action.action(orderItm?.order?._id); console.log(orderItm?.order?._id) }}
                                                    style={{ display: 'flex', border: '0.75px solid #c3e1e9', padding: '0 18px', width: 'fit content', height: '40px', background: '#eaf6f9', color: '#2293b6', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                                    <i className={action?.icon} style={{ fontSize: '20px' }} />
                                                    <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>{action?.label}</div>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                            </li>
                        )
                    })
                }
                {/* </Slide> */}
            </ul >
        </div >
    )
}
