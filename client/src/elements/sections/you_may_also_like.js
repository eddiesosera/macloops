import React from 'react'
import { Card } from '../components/card';
import './style/ymal.css'
import { JackInTheBox } from 'react-awesome-reveal';

export const YouMayAlsoLike = ({ may_like_products }) => {
    return (

        <ul className='ymal_wrap' style={{ display: "flex", justifyContent: 'space-between', padding: '0' }}>

            {may_like_products.map(sale => {
                return (
                    <li key={sale.imgsrc} style={{ listStyle: 'none' }}><Card product={sale} /></li>
                );
            })}

        </ul>

    )
}
