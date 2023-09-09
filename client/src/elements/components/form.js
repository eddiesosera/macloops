import React, { useEffect, useState } from 'react'
import { ImageUpload } from './imageUpload';
import { DropDown } from './dropDown';
import './style/form.css';
// const imageSize = require("image-size"); // Library to get image dimensions
// const imagemin = require("imagemin"); // Library for image optimization
// const imageminJpegtran = require("imagemin-jpegtran"); // JPEG optimization plugin
// const imageminPngquant = require("imagemin-pngquant"); // PNG optimization plugin


export const Form = ({ formObj, formFields, btnAction, heading, btnTitle }) => {
    const [formObjContainer, setFormObjContainer] = useState({});
    const [compressedImg, setCompressedImg] = useState("")

    useEffect(() => {
        formObj(formObjContainer);

    }, [formObjContainer])

    // STYLE
    const inputStyle = {
        border: '0.75px solid #e2ddd6', padding: '12px 16px', width: 'fit-content', background: 'none', fontFamily: 'Nunito Sans', outline: 'none',
        fontWeight: '600'
    };

    const buttonStyle = {
        display: 'flex', padding: '0 18px', width: '100%', height: '50px', fontWeight: '800', fontFamily: 'Nunito Sans',
        background: '#171819', color: '#effbff', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none',
        marginTop: '20px', marginBottom: '10px', fontSize: '16px', transition: 'all 0.8s cubic-bezier(0.25,0.75,0.5,1) 0s'
    };


    const onClickAction = (e) => {
        btnAction(e);
        e.preventDefault()
    }

    // Function to compress an image from base64 to a lower quality JPEG
    function compressImageTo100KB(base64Image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64Image;

            // When the image is loaded
            img.onload = function () {
                // Create a canvas element
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Calculate the new width and height for compression (50% reduction)
                const newWidth = Math.floor(img.width * 0.25); // Adjust as needed
                const newHeight = Math.floor(img.height * 0.25); // Adjust as needed

                // Set the canvas dimensions
                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw the image onto the canvas with the new dimensions
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Convert the canvas content to base64 JPEG with extremely low quality
                const compressedBase64 = canvas.toDataURL("image/png", 0.25); // 0.001 indicates 0.1% quality

                // Convert base64 data URL to ArrayBuffer and calculate size
                const binaryString = atob(compressedBase64.split(',')[1]);
                const buffer = new ArrayBuffer(binaryString.length);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < binaryString.length; i++) {
                    view[i] = binaryString.charCodeAt(i);
                }
                const sizeInKB = Math.ceil(buffer.byteLength / 1024);

                if (sizeInKB <= 90) { // 40 KB
                    resolve(compressedBase64);
                } else {
                    reject(new Error("Image couldn't be compressed to 40 KB or less. Image size: " + sizeInKB));
                }
            };

            img.onerror = function () {
                reject(new Error("Image load error."));
            };
        });
    };


    function extractAndReplaceParameter(obj, targetPropertyName, replacementPropertyName, parentPath = '') {
        return Object.keys(obj).reduce((result, key) => {
            const fullPath = parentPath ? `${parentPath}.${key}` : key;

            if (key === targetPropertyName) {
                // If the current property matches the target parameter name
                const replacementValue = obj[replacementPropertyName];
                result[replacementValue] = obj[key];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // If the property is an object, recursively search within it
                const nestedResult = extractAndReplaceParameter(obj[key], targetPropertyName, replacementPropertyName, fullPath);
                if (Object.keys(nestedResult).length > 0) {
                    result = { ...result, ...nestedResult };
                }
            }

            return result;
        }, {});
    };


    useEffect(() => {
        // console.log("PREFILL", extractAndReplaceParameter(formFields, 'value', 'name'))
        setFormObjContainer(extractAndReplaceParameter(formFields, 'value', 'name'));
    }, [])


    return (
        <div>
            <div className="login_input" style={{ display: 'flex', gap: '30px', flexDirection: 'column', alignItems: 'center', background: '#FFFBF6', padding: ' 30px 40px', height: 'fit-content', border: '0.75px solid #E9E6E1', minWidth: '265px' }}>
                <div className="login_Label" style={{ fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', fontSize: '24px', textTransform: 'uppercase' }}>{heading}</div>
                <div className="input_wrap" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                    {
                        formFields.map(field => {
                            if (field?.type === "single_image") {
                                return (
                                    <ImageUpload maxNumber={field?.maxNumber} value={formObjContainer[field?.name]} imageLabel={field?.placeholder} listOfIimages={
                                        // getImgs;
                                        (img) => {

                                            compressImageTo100KB(img[0]?.data_url)
                                                .then(compressedImage => {
                                                    setFormObjContainer({ ...formObjContainer, [field?.name]: compressedImage });
                                                    console.log("Compressed image:", compressedImage);
                                                    setCompressedImg(compressedImg)
                                                    // setFormObjContainer({ ...formObjContainer, [field?.name]: img[0]?.data_url });

                                                })
                                                .catch(error => {
                                                    console.error("Error:", error.message);
                                                });

                                        }
                                    } />
                                )
                            } if (field?.type === "multiple_image") {
                                return (
                                    <ImageUpload maxNumber={field?.maxNumber} imageLabel={field?.placeholder} listOfIimages={
                                        // getImgs;
                                        (img) => {

                                            compressImageTo100KB(img[0]?.data_url)
                                                .then(compressedImage => {
                                                    setFormObjContainer({ ...formObjContainer, [field?.name]: compressedImage });
                                                    console.log("Compressed image:", compressedImage);
                                                    setCompressedImg(compressedImg)
                                                    // setFormObjContainer({ ...formObjContainer, [field?.name]: img[0]?.data_url });

                                                })
                                                .catch(error => {
                                                    console.error("Error:", error.message);
                                                });

                                        }
                                    } />
                                )
                            }
                            else if (field?.type === "textarea") {
                                return (
                                    <textarea type={field?.type} value={formObjContainer[field?.name]} placeholder={field?.placeholder} style={inputStyle}
                                        // onChange={e => field.input(e)} />
                                        onChange={e => {
                                            setFormObjContainer({ ...formObjContainer, [field?.name]: e.target.value });
                                        }
                                        } />
                                )
                            } else if (field?.type === "text" || field?.type === "email") {
                                return (
                                    <input type={field?.type} value={formObjContainer[field?.name]} placeholder={field?.placeholder} style={inputStyle}
                                        // onChange={e => field.input(e)} />
                                        onChange={e => {
                                            setFormObjContainer({ ...formObjContainer, [field?.name]: e.target.value });
                                        }
                                        } />
                                )
                            } else if (field?.type === "number") {
                                return (
                                    <input type="number" value={formObjContainer[field?.name]} placeholder={field?.placeholder} style={inputStyle}
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
                                    <input type={field?.type} value={formObjContainer[field?.name]} placeholder={field?.placeholder} style={inputStyle}
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
