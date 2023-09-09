import React, { useEffect, useState } from 'react';
import { ImageUpload } from './imageUpload';
import { DropDown } from './dropDown';
import './style/form.css';

export const Form = ({ formObj, formFields, btnAction, heading, btnTitle }) => {
    const [formObjContainer, setFormObjContainer] = useState({});
    const [compressedImg, setCompressedImg] = useState('');

    useEffect(() => {
        formObj(formObjContainer);
    }, [formObjContainer]);

    const inputStyle = {
        border: '0.75px solid #e2ddd6',
        padding: '12px 16px',
        width: 'fit-content',
        background: 'none',
        fontFamily: 'Nunito Sans',
        outline: 'none',
        fontWeight: '600',
    };

    const buttonStyle = {
        display: 'flex',
        padding: '0 18px',
        width: '100%',
        height: '50px',
        fontWeight: '800',
        fontFamily: 'Nunito Sans',
        background: '#171819',
        color: '#effbff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        border: 'none',
        marginTop: '20px',
        marginBottom: '10px',
        fontSize: '16px',
        transition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s',
    };

    const onClickAction = (e) => {
        btnAction(e);
        e.preventDefault();
    };

    async function compressImageTo100KB(base64Image) {
        // ... your existing code for image compression ...
    }

    useEffect(() => {
        const initialFormState = {};
        formFields.forEach((field) => {
            initialFormState[field.name] = '';
        });
        setFormObjContainer(initialFormState);
    }, []);

    return (
        <div>
            <div
                className="login_input"
                style={{
                    display: 'flex',
                    gap: '30px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#FFFBF6',
                    padding: ' 30px 40px',
                    height: 'fit-content',
                    border: '0.75px solid #E9E6E1',
                    minWidth: '265px',
                }}
            >
                <div
                    className="login_Label"
                    style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '800',
                        color: '#2f2e2d',
                        fontSize: '24px',
                        textTransform: 'uppercase',
                    }}
                >
                    {heading}
                </div>
                <div
                    className="input_wrap"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'flex-start',
                    }}
                >
                    {formFields.map((field) => {
                        if (field?.type === 'single_image' || field?.type === 'multiple_image') {
                            return (
                                <ImageUpload
                                    key={field.name}
                                    maxNumber={field?.maxNumber}
                                    value={formObjContainer[field?.name]}
                                    imageLabel={field?.placeholder}
                                    listOfIimages={(img) => {
                                        compressImageTo100KB(img[0]?.data_url)
                                            .then((compressedImage) => {
                                                setFormObjContainer({ ...formObjContainer, [field?.name]: compressedImage });
                                                setCompressedImg(compressedImg);
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error.message);
                                            });
                                    }}
                                />
                            );
                        } else if (field?.type === 'textarea' || field?.type === 'text' || field?.type === 'email' || field?.type === 'number' || field?.type === 'password') {
                            return (
                                <input
                                    key={field.name}
                                    type={field?.type}
                                    value={formObjContainer[field?.name]}
                                    placeholder={field?.placeholder}
                                    style={inputStyle}
                                    onChange={(e) => {
                                        setFormObjContainer({ ...formObjContainer, [field?.name]: e.target.value });
                                    }}
                                />
                            );
                        } else if (field?.type === 'dropdown') {
                            return (
                                <div key={field.name}>
                                    <DropDown
                                        placeholder={field?.placeholder}
                                        options={field?.list}
                                        selectedValue={(opt) => {
                                            setFormObjContainer({ ...formObjContainer, [field?.name]: opt });
                                        }}
                                    />
                                </div>
                            );
                        }
                    })}
                    <button className="form_submit_btn" type="submit" style={buttonStyle} onClick={onClickAction}>
                        {btnTitle}
                    </button>
                </div>
            </div>
        </div>
    );
};
