import React from 'react'

export const PRating = ({ p_rating }) => {

    return (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div className='rating_star_wrap' style={{ color: '#C3BCB2' }}>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
            </div>
            <div className='rating_rate_wrap' style={{ display: 'flex', color: '#C3BCB2', gap: '5px' }}>
                <div className='rating_rate' style={{ fontWeight: '700' }}>{p_rating?.length > 0 && p_rating?.toFixed(1)}</div>
                <div className='rating_people' style={{ display: 'flex', fontSize: '14px', }}>
                    {"( "}
                    <div style={{ marginRight: '4px' }}>{(p_rating?.length === undefined ? 0 : p_rating?.length)}</div>
                    {" " + "people" + " )"}
                </div>
            </div>
        </div>
    )
}
