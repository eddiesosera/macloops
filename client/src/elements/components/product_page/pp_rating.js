import React from 'react'

export const PRating = ({ p_rating }) => {

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div className='rating_star_wrap' style={{ color: '#C3BCB2' }}>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
            </div>
            <div className='rating_rate_wrap' style={{ display: 'flex', color: '#C3BCB2', gap: '5px' }}>
                <div className='rating_rate' style={{ fontWeight: '700' }}>{p_rating.toFixed(1)}</div>
                <div className='rating_people' style={{ display: 'flex' }}>
                    {"("}
                    <div >  {(p_rating?.length === undefined ? 0 : p_rating?.length)}
                    </div>
                    {" people" + ")"} </div>
            </div>
        </div>
    )
}
