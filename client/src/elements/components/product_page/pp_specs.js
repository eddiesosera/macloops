import React from 'react'

export const PPSpecs = ({ specs }) => {

    return (
        <div className='specs_wrap' style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className='specs_wrap_group_1' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className='specs_label' style={{ fontFamily: 'Montserrat', fontSize: '32px', fontWeight: '500', color: '#7A756C' }}>Description</div>
                <div className='specs_content'>{specs?.description}</div>
            </div>
            <div className='specs_wrap_group_2' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className='specs_label' style={{ fontFamily: 'Montserrat', fontSize: '32px', fontWeight: '500', color: '#7A756C' }}>specifications</div>
                <div className='specs_division_wrap' style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className='specs_division'>
                        <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>WIDTH</div>
                        <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                            {specs?.specifications?.dimensions?.width + specs?.specifications?.dimensions?.dimensions_unit}
                        </div>
                    </div>
                    <div className='specs_division'>
                        <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>HEIGHT</div>
                        <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                            {specs?.specifications?.dimensions?.height + specs?.specifications?.dimensions?.dimensions_unit}
                        </div>
                    </div>
                    <div className='specs_division'>
                        <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>DEPTH</div>
                        <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                            {specs?.specifications?.dimensions?.depth + specs?.specifications?.dimensions?.dimensions_unit}
                        </div>
                    </div>
                    <div className='specs_division'>
                        <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>WEIGHT</div>
                        <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                            {specs?.specifications?.dimensions?.weight + specs?.specifications?.dimensions?.dimensions_unit}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
