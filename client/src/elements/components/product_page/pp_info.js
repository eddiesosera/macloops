import React from 'react'
import { PRating } from './pp_rating'

export const PPInfo = ({ productInfo }) => {
    return (
        <div>
            <div className='info_group_1'>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat' }}>{productInfo?.name}</div>
                <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.slogan}</div>
            </div>
            <div className='info_group_2'>
                <div style={{ fontSize: '48px', fontFamily: 'Montserrat' }}>{productInfo.manufacturer}</div>
                {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
            </div>
            <div className='info_group_2'>
                <PRating p_rating={productInfo.rating} />
            </div>
        </div>
    )
}
