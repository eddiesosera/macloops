import React from 'react'

export const PRating = ({ p_rating }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div className='rating_star_wrap'>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
            </div>
            <div className='rating_rate'>{p_rating}</div>
        </div>
    )
}
