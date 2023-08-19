import React, { useEffect, useState } from 'react'
import { ImageUpload } from './imageUpload';
import { DropDown } from './dropDown';
import './style/form.css'

export const Form = ({ formObj, formFields, btnAction, heading, btnTitle }) => {
    const [formObjContainer, setFormObjContainer] = useState({})

    useEffect(() => {
        formObj(formObjContainer);
    }, [formObjContainer])

    // STYLE
    const inputStyle = {
        border: '0.75px solid #e2ddd6', padding: '12px', width: '300px', background: 'none', fontFamily: 'Nunito Sans', outline: 'none'
    };

    const buttonStyle = {
        display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: '100%', height: '40px',
        background: '#171819', color: '#C4E4EE', alignItems: 'center', justifyContent: 'center', gap: '10px',
        marginTop: '20px', marginBottom: '10px', fontSize: '15px',
    };


    const onClickAction = (e) => {
        btnAction(e);
        e.preventDefault()
    }


    // const getDropdownOpt = (opt) => { setFormObjContainer({ ...formObjContainer, [field?.name]: opt }) }


    return (
        <div>
            <div className="login_input" style={{ display: 'flex', gap: '30px', flexDirection: 'column', alignItems: 'center', background: '#FFFBF6', padding: '20px', height: 'fit-content', width: '400px', border: '0.75px solid #E9E6E1' }}>
                <div className="login_Label" style={{ fontFamily: 'Montserrat', fontWeight: '700', color: '#13120F', fontSize: '36px' }}>{heading}</div>
                <div className="input_wrap" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                    {
                        formFields.map(field => {
                            if (field?.type === "single_image") {
                                return (
                                    <ImageUpload listOfIimages={
                                        // getImgs;
                                        (img) => { setFormObjContainer({ ...formObjContainer, [field?.name]: img[0]?.data_url }) }
                                    } />
                                )
                            } else if (field?.type === "text" || field?.type === "email") {
                                return (
                                    <input type={field?.type} placeholder={field?.placeholder} style={inputStyle}
                                        // onChange={e => field.input(e)} />
                                        onChange={e => {
                                            setFormObjContainer({ ...formObjContainer, [field?.name]: e.target.value });
                                        }
                                        } />
                                )
                            } else if (field?.type === "dropdown") {
                                return (
                                    <div >
                                        <DropDown placeholder={field?.placeholder} options={field?.list} selectedValue={(opt) => { setFormObjContainer({ ...formObjContainer, [field?.name]: opt }) }} />
                                    </div>
                                )
                            } else if (field?.type === "password") {
                                return (
                                    <input type={field?.type} placeholder={field?.placeholder} style={inputStyle}
                                        // onChange={e => field.input(e)} />
                                        onChange={e => {
                                            setFormObjContainer({ ...formObjContainer, [field?.name]: e.target.value });
                                        }
                                        } />
                                )
                            }
                        })
                        // returnField()
                    }
                    <button className='form_submit_btn' type="submit" style={buttonStyle} onClick={e => { onClickAction(e) }}>
                        {btnTitle}
                    </button>
                </div>
            </div>
        </div>
    )
}
