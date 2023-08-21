import React, { useEffect, useState } from 'react';
// import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
// var Tooltip = require('rc-tooltip');
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css';

export const DropDown = ({ options, placeholder, selectedValue, selectedOptionLabel, index }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionLbl, setSelectedOptionLbl] = useState(placeholder);
    const [dropDownTgl, setDropDownTgl] = useState(false)


    const optionIcnStyle = {}
    const loption = [
        {
            option_element: <i className='ph-bold ph-user' style={{ color: '#3A7C91' }} />,
            option_text: 'Customer',
            option_value: 'customer',
            option_state: true,
            option_valueTooltipText: ''
        },
        {
            option_element: <i className='ph-bold ph-user-circle' style={{ color: '#3A7C91' }} />,
            option_text: 'Admin',
            option_value: 'admin',
            option_state: false,
            option_valueTooltipText: 'You need to be an admin to create an Admin account.'
        }
    ]


    useEffect(() => {
        selectedValue(selectedOption)
    }, [selectedOption]);


    const returnOptionColor = (optn) => {
        if (optn?.option_state) {
            if (selectedOption === optn?.option_value) {
                return '#0C303B'
            } else {
                return '#3A7C91'
            }

        } else {
            return '#BDC5C7'
        }
    }


    return (
        <div className='dropdown_wrap' style={{ height: '40px', zIndex: (1 + index), position: 'relative' }}>
            <div className='dropdown_hide' style={{
                height: '100vh', width: '100vw', position: 'fixed', background: '#ffffff00',
                zIndex: '-1', display: dropDownTgl ? 'block' : 'none', top: 0, bottom: 0, left: 0, right: 0
            }} onClick={e => setDropDownTgl(false)}></div>
            <button className='add_btn' style={{
                display: 'flex', border: dropDownTgl ? '1px solid #2293B6' : ' 0.75px solid #C3E1E9', padding: '0 15px', width: '100%',
                height: '40px', background: 'none', color: '#2293B6', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
                zIndex: '1'
            }} onClick={e => setDropDownTgl(!dropDownTgl)}>
                <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600', color: '#2293B6', fontSize: '14px' }}>{selectedOptionLabel === undefined ? selectedOptionLbl : selectedOptionLabel}</div>
                <i className={dropDownTgl ? 'ph-bold ph-caret-up' : 'ph-bold ph-caret-down'} style={{ fontSize: '14px', }} />
            </button>
            <div className='options_wrap' style={{
                background: '#FFFBF6', borderLeft: dropDownTgl ? '0.5px solid #2293B6' : '', borderRight: dropDownTgl ? '0.5px solid #2293B6' : '',
                borderBottom: dropDownTgl ? '0.5px solid #2293B6' : '', padding: '0', boxShadow: '1px 0px 4px 0px  rgba(14, 15, 15, 0.26)',
                opacity: dropDownTgl ? '1' : '0', display: dropDownTgl ? 'block' : 'none', transition: 'all 0.28s cubic-bezier(0.25,0.75,0.5,1) 0s'
            }}>
                {
                    options.map((optn, index) => {
                        return (
                            <div className='option_itm' style={{
                                display: 'flex', gap: '10px', borderBottom: index !== (options.length - 1) ? '0.5px solid #E6EBEC' : '',
                                padding: '8px 15px', cursor: optn?.option_state ? 'pointer' : 'not-allowed', alignItems: 'center',
                                color: optn?.option_state ? '' : '#BDC5C7 !important',
                                background: selectedOption === optn?.option_value ? '#F3F4F4' : ''
                            }} onClick={e => {
                                optn?.option_state && setSelectedOption(optn?.option_value);
                                optn?.option_state && setSelectedOptionLbl(optn?.option_text);
                                setDropDownTgl(false)
                            }}>
                                {/* <Tooltip placement="bottom" trigger={['hover']} overlay={
                                    <div style={{ display: optn?.option_state === false ? 'block' : 'none' }}>
                                        {optn?.option_valueTooltipText}</div>}
                                > */}
                                <div className='option_itm_element' style={{ color: optn?.option_state ? '' : ('#BDC5C7'), display: optn?.option_element === "" ? 'none' : 'block' }}>{optn?.option_element}</div>
                                <div className='option_itm_text' style={{
                                    fontFamily: 'Nunito Sans',
                                    fontWeight: selectedOption === optn?.option_value ? '800' : '500', fontSize: '13px',
                                    color: returnOptionColor(optn)
                                }}>
                                    {optn?.option_text}
                                </div>
                                {/* </Tooltip> */}
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
