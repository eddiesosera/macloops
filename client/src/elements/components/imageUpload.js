import React from 'react';
import ImageUploading from "react-images-uploading";

import "./style/imageUpload.css";

export const ImageUpload = ({ listOfIimages, type }) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        listOfIimages(imageList)
    };
    const imgUpldBtnStyle = {
        width: '100%', borderRadius: '0'
    }


    return (
        <div className="imageUpload_wrap" style={{ background: 'none', width: '100%' }}>
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url" acceptType={["jpg", "png", "gif"]}>
                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                    // write your building UI
                    <div className="upload__image-wrapper" style={{ background: 'none', width: '100%' }}>
                        {/* If type is single after you upload the image it should hide this button */}
                        {
                            imageList.length === 0 ?
                                <button className='imageUpload_btn1'
                                    style={imgUpldBtnStyle} onClick={onImageUpload} {...dragProps}>
                                    <div>
                                        <i class="ph-bold ph-upload-simple" style={{ fontSize: '20px' }} />
                                    </div>
                                    <div style={{ fontFamily: 'Nunito Sans' }}>Profile Image</div>
                                </button>
                                : ''
                        }
                        <div style={{ height: '0px' }}>&nbsp;</div>
                        {imageList.length < 2 ? '' : <button onClick={onImageRemoveAll}>Remove all images</button>}
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item" style={{ alignItems: 'center', justifyContent: 'flex-start', margin: '0 auto' }}>
                                <img src={image.data_url} alt="" onClick={() => onImageUpdate(index)} {...dragProps}
                                    style={{ height: '100px', width: '100px', borderRadius: '100px', objectFit: 'cover' }} />
                                <div className="image-item__btn-wrapper" style={{ marginRight: '-6px' }}>
                                    <button className='Remove' onClick={() => onImageRemove(index)}
                                        style={{
                                            fontSize: '20px', height: '30px', background: '#fffbf6',
                                            alignItems: 'center', justifyContent: 'center', border: '1px solid #e2ddd6', width: '30px',
                                            borderRadius: '30px', display: 'flex'
                                        }}>
                                        <i class="ph-bold ph-x" />
                                    </button>
                                    <button className='Update' onClick={() => onImageUpdate(index)} style={{
                                        fontSize: '20px', height: '30px', color: '#e2ddd6', background: '#171819',
                                        alignItems: 'center', justifyContent: 'center', border: '2px solid #fffbf6', width: '30px',
                                        borderRadius: '30px', display: 'flex'
                                    }}>
                                        <i class="ph-bold ph-pencil-simple" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}
