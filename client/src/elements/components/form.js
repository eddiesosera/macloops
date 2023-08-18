import React, { useEffect, useState } from 'react'
import { ImageUpload } from './imageUpload';

export const Form = ({ formData, formFields, btnAction, heading, btnTitle, imgs }) => {


    // STYLE
    const inputStyle = {
        border: '0.75px solid #e2ddd6', padding: '12px', width: '350px', background: 'none', fontFamily: 'Nunito Sans', outline: 'none'
    };

    const buttonStyle = {
        display: 'flex', border: ' 0.75px solid #C3E1E9', padding: '0 18px', width: '380px', height: '40px',
        background: '#EAF6F9', color: '#2293B6', alignItems: 'center', justifyContent: 'center', gap: '10px',
        marginTop: '20px', marginBottom: '10px', fontSize: '15px'
    };


    const onClickAction = (e) => {
        btnAction(e);
        e.preventDefault()
    }


    const getImgs = (img) => {
        imgs(img)
    }


    return (
        <div>
            <div className="login_input" style={{ display: 'flex', gap: '30px', flexDirection: 'column', alignItems: 'center', background: '#FFFBF6', padding: '30px', height: 'fit-content', width: '400px', border: '0.75px solid #E9E6E1' }}>
                <div className="login_Label" style={{ fontFamily: 'Montserrat', fontWeight: '700', color: '#13120F', fontSize: '36px' }}>{heading}</div>
                <div className="input_wrap" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    {
                        formFields.map(field => {
                            if (field?.type === "image") {
                                return (
                                    <ImageUpload listOfIimages={getImgs} />
                                )
                            } else if (field?.type === "password" || field?.type === "text" || field?.type === "email") {
                                return (
                                    <input type={field?.type} placeholder={field?.placeholder} style={inputStyle}
                                        onChange={e => field.input(e)} />
                                )
                            }
                        })
                        // returnField()
                    }
                    <button type="submit" style={buttonStyle} onClick={e => { onClickAction(e) }}>
                        {btnTitle}
                    </button>
                </div>
            </div>
        </div>
    )
}
