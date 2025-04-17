import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";


const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setImage(file);

            // Generate preview url from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return <div className="flex justify-center mb-6">
        <input 
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />
       
        {!image ? (
            <div className="w-27 h-27 flex items-center justify-center bg-blue-100/50 rounded-full relative">
            < LuUser className="text-6xl text-primary" />
            <button type="button" className="w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={onChooseFile}>
            <LuUpload />
            </button>
            </div>
        ) : (
            <div className="relative">
                <img src={previewUrl}
                 alt="profile photo"
                 className="w-27 h-27 rounded-full object-cover"/>
                <button 
                    type="button" 
                    className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer " 
                    onClick={handleRemoveImage}
                >
                < LuTrash />
                </button>
            </div>
        )}
    </div>
};
export default ProfilePhotoSelector;