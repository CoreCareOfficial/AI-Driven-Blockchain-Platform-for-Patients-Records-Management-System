import { Image } from "react-bootstrap";
import user_signup from '../../assets/user_signup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';



function ImageSignup() {

    const fileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [SelectedImageUrl, setSelectedImageUrl] = useState(user_signup)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            return alert('Please select an image file.');
        }

        setSelectedFile(file);

        const formData = new FormData();
        formData.append('profileImage', file);

        // Send the image data to the server for upload
        fetch('/upload-profile-image', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle successful upload response (e.g., update user profile state)
                console.log('Image uploaded successfully:', data);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                // Handle upload error
            });
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedFile(file);
            setSelectedImageUrl(e.target.result); // Store the image URL for display
        };
        reader.readAsDataURL(file);
    };

    const styleInputFile = {
        backgroundColor: '#ffffff',
        color: '#3146FF',
        width: '97%',
        height: '34px',
        borderRadius: '50PX',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        margin: "6px 0",
        // paddingLeft: '12px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };


    return (
        <div className="image-signup" style={{ maxWidth: '136px' }}>
            <Image
                src={SelectedImageUrl}
                thumbnail
                style={{ backgroundColor: 'transparent', maxHeight: '120px', minWidth: '90%' }}
                onClick={() => alert(SelectedImageUrl)
                }
            />
            <div style={styleInputFile} >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    style={{ opacity: '0', flex: '1' }}
                    onChange={handleFileChange}
                />
                <div
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => {
                        fileRef.current.click();
                    }
                    }
                >
                    <FontAwesomeIcon
                        style={{ marginRight: '4px' }}
                        icon={faUpload}
                    />
                    <label>Upload Photo</label>
                </div>
            </div>
        </div>
    );
};

export default ImageSignup;