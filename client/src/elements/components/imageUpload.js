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


    return (
        <div className="imageUpload_wrap">
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url" acceptType={["jpg", "png", "gif"]}>
                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {/* If type is single after you upload the image it should hide this button */}
                        {imageList.length === 0 ? <button style={isDragging ? { color: "red" } : null} onClick={onImageUpload} {...dragProps}>Click or Drop here</button> : ''}
                        <div style={{ height: '0px' }}>&nbsp;</div>
                        {imageList.length < 2 ? '' : <button onClick={onImageRemoveAll}>Remove all images</button>}
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" onClick={() => onImageUpdate(index)} {...dragProps} />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}
