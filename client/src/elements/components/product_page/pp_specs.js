import React from 'react';
import { Fade } from "react-awesome-reveal";

export const PPSpecs = ({ specs }) => {

    return (
        <Fade cascade damping={0.1}>
            <div className='specs_wrap' style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
                <Fade cascade damping={0.3}>
                    <div className='specs_wrap_group_1' style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
                        <div className='specs_label' style={{ fontFamily: 'Montserrat', fontSize: '32px', fontWeight: '700', color: '#7A756C', width: '500px', textAlign: 'center', textTransform: 'uppercase' }}>Description</div>
                        <div className='specs_content' style={{ width: '500px', textAlign: 'center', }}>{specs?.description}</div>
                    </div>
                </Fade>
                <div className='specs_wrap_group_2' style={{ display: 'flex', flexDirection: 'column', gap: '60px', justifyContent: 'center' }}>
                    <div className='specs_label' style={{ fontFamily: 'Montserrat', fontSize: '32px', fontWeight: '700', color: '#7A756C', textAlign: 'center', textTransform: 'uppercase' }}>Specifications</div>
                    <div className='specs_division_wrap' style={{ display: 'flex', justifyContent: "center", gap: '120px' }}>
                        <Fade cascade damping={0.3}>
                            <div className='specs_division'>
                                <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>Width</div>
                                <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                                    {specs?.specifications?.dimensions?.width + specs?.specifications?.dimensions?.dimensions_unit}
                                </div>
                            </div>
                        </Fade>
                        <Fade cascade damping={0.3}>
                            <div className='specs_division'>
                                <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>Height</div>
                                <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                                    {specs?.specifications?.dimensions?.height + specs?.specifications?.dimensions?.dimensions_unit}
                                </div>
                            </div>
                        </Fade>
                        <Fade cascade damping={0.3}>
                            <div className='specs_division'>
                                <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>Depth</div>
                                <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                                    {specs?.specifications?.dimensions?.depth + specs?.specifications?.dimensions?.weight_unit}
                                </div>
                            </div>
                        </Fade>
                        <Fade cascade damping={0.3}>
                            <div className='specs_division'>
                                <div className='specs_width_label' style={{ color: '#7A756C', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px' }}>Weight</div>
                                <div className='specs_content' style={{ color: '#13120F', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                                    {specs?.specifications?.dimensions?.weight + specs?.specifications?.dimensions?.weight_unit}
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
