import React from 'react'
import { Card } from '../components/card';
import './style/ymal.css'
import { JackInTheBox } from 'react-awesome-reveal';
import Masonry from 'react-responsive-masonry';

export const YouMayAlsoLike = ({ may_like_products }) => {
    return (

        <Masonry className='ymal_wrap' columnsCount={window.screen.width > 770 ? 5 : 1} gutter="30px" style={{ zIndex: '1' }}>

            {may_like_products.map((sale, index) => {
                if (index < 5) {
                    return (
                        <li key={sale.imgsrc} style={{ listStyle: 'none' }}><Card product={sale} /></li>
                    );
                }
            })}

        </Masonry>

    )
}
