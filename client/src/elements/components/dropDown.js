import React from 'react'

export const DropDown = ({ options, placeholder, selectedValue }) => {
    return (
        <div><button className='add_btn' style={{ display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: 'fit content', height: '40px', background: 'none', color: '#2293B6', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600', color: '#2293B6' }}>{placeholder}</div>
            <i className='ph-bold ph-caret-down' style={{ fontSize: '20px', }} />
        </button></div>
    )
}
