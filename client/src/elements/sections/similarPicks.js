import React from 'react'
import { Card } from '../components/card';
import { JackInTheBox } from 'react-awesome-reveal';

export const SimilarPicks = ({ similar_picks }) => {
    // Algorithm
    // Items in algorithm = category, type, price, rating
    // Algorithm logic = filter category, if array < 2, filter type, sort by rating then price
    return (
        <div style={{ background: '#FAF6F2' }}>
            <div style={{ fontSize: '36px', fontWeight: '600', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: 'Montserrat', textTransform: 'uppercase', fontSize: '24px', fontWeight: '700', color: '#13120f' }}>Similar Picks</div>
                    <button style={{ background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Montserrat', fontWeight: '600', padding: '0 20px', height: '45px' }}>View Pianos</button>
                </div>
            </div>

            <ul className='ymal_wrap' style={{ display: "flex", justifyContent: 'space-between', padding: '0' }}>
                {similar_picks.map(sp => {
                    return <li key={sp.imgsrc} style={{ listStyle: 'none' }}><Card product={sp} /></li>;
                })}
            </ul>

        </div>
    )
}
