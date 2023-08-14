import React from 'react'
import { Card } from '../components/card';

export const SimilarPicks = ({ similar_pick }) => {
    // Algorithm
    // Items in algorithm = category, type, price, rating
    // Algorithm logic = filter category, if array < 2, filter type, sort by rating then price
    return (
        <div>
            <ul className='ymal_wrap' style={{ display: "flex", justifyContent: 'space-between', padding: '0' }}>
                {may_like_products.map(sale => {
                    return <li key={sale.imgsrc} style={{ listStyle: 'none' }}><Card product={similar_pick} /></li>;
                })}
            </ul>
        </div>
    )
}
