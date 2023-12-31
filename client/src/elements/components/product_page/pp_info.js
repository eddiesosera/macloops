import React, { useState } from 'react'
import { PRating } from './pp_rating'
import { ProductQuantity } from './productQuantity'
import { DropDown } from '../dropDown';
import { Fade } from "react-awesome-reveal";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PPInfo = ({ productInfo, userObj, userMode, pagestate }) => {
    const [infoForm, setInfoForm] = useState({});
    const navigate = useNavigate()


    const colors = {
        name: 'role',
        type: 'dropdown',
        placeholder: 'Select Color',
        list: [
            {
                option_element: <i className='ph-fill ph-circle' style={{ color: 'black' }} />,
                option_text: 'Black',
                option_value: 'black',
                option_state: true,
                option_valueTooltipText: ''
            }, {
                option_element: <i className='ph-fill ph-circle' style={{ color: 'white' }} />,
                option_text: 'White',
                option_value: 'white',
                option_state: true,
                option_valueTooltipText: ''
            },
            {
                option_element: <i className='ph-fill ph-circle' style={{ color: 'brown' }} />,
                option_text: 'Wooden Brown',
                option_value: 'wooden_brown',
                option_state: true,
                option_valueTooltipText: ''
            },
            {
                option_element: <i className='ph-fill ph-circle' style={{ color: 'red' }} />,
                option_text: 'Red',
                option_value: 'red',
                option_state: false,
                option_valueTooltipText: 'Out of Stock'
            }
        ],
    }


    // Delete Product
    const deleteProduct = () => {
        // alert(productInfo?._id)
        axios.delete('http://localhost:5000/api/product/' + productInfo?._id)
            .then((res) => {
                navigate("/products")
            })
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '480px' }}>
            <Fade cascade damping={0.3}>
                <div className='info_group_1' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ fontSize: '72px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase' }}>{productInfo?.name}</div>
                    <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '800', color: '#6F6D6A', textTransform: 'uppercase' }}>{productInfo?.slogan}</div>
                </div>
                <div className='info_group_2' >
                    <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '500', color: '#6F6D6A', }}>By {productInfo?.manufacturer}</div>
                    {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
                </div>
                <div className='info_group_3'>
                    <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '800', color: '#13120F' }}>R {productInfo?.price}</div>
                    {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
                </div>
                <div className='info_group_4'>
                    <PRating p_rating={productInfo?.rating} />
                </div>
            </Fade>
            <div className='info_group_5'>
                <DropDown placeholder={colors?.placeholder} options={colors?.list} selectedValue={(opt) => { setInfoForm({ ...infoForm, color: opt }) }} />
            </div>
            <div className='info_group_6'>
                <ProductQuantity />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className='info_group_7_interaction' style={{ display: 'flex', gap: '20px' }}>

                    <button className='add_btn' style={{ display: 'flex', border: '0.75px solid #E9DCC3', padding: '0 18px', width: 'fit content', height: '40px', background: '#F9F4EA', color: '#875E0C', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <i className='ph-fill ph-shopping-cart-simple' style={{ fontSize: '20px' }} />
                        <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Add to Cart</div>
                    </button>
                    <div className='like_btn_wrap' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7E9EA', border: "solid 0.75px #E9C3C6", color: '#e50e21', height: '40px', width: "40px", cursor: 'pointer' }}><i className='ph-fill ph-heart' style={{ fontSize: '20px' }} /></div>
                </div>
                {
                    // Only admins can access this section
                    userObj?.role === "admin" && userMode === "admin" &&
                    <div className='info_group_7_admin' style={{ display: 'flex', gap: '20px' }}>
                        <button style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#2293B6",
                            background: '#EAF6F9', border: '0.75px solid #C3E1E9', width: 'fit-content', height: "40px",
                            padding: '0 20px', gap: "10px"
                        }}
                            onClick={e => { pagestate("edit-product") }}
                        >
                            <i className='ph ph-pencil-simple' style={{ fontSize: '20px', }} />
                            <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Edit Product</div>
                        </button>
                        <button style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            color: '#2293B6', background: '#EAF6F9', border: '0.75px solid #C3E1E9',
                            width: 'fit-content', height: "40px", padding: '0 20px', gap: '10px'
                        }}
                            onClick={e => deleteProduct()}>
                            <i className='ph ph-trash' style={{ fontSize: '20px', }} />
                            <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                                Delete Product
                            </div>
                        </button>
                    </div>
                }
            </div >
        </div >
    )
}
