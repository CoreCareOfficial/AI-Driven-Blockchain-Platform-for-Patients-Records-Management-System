import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { HealthcareFacilityInfo, userInfo } from "../../Recoil/Atom";


function Upload(props) {
    const styleInputFile = {
        backgroundColor: '#ffffff',
        color: '#3146FF',
        width: '100%',
        height: '34px',
        borderRadius: '50PX',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        margin: "6px 0",
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px'
    };

    // const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef(null);
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            return alert('Please select an image file.');
        }

        // setSelectedFile(file);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: file
        }));

        // const formData = new FormData();
        // formData.append('profileImage', file);

        // Send the image data to the server for upload
        // fetch('/upload-profile-image', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle successful upload response (e.g., update user profile state)
        //         console.log('Image uploaded successfully:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading image:', error);
        //         // Handle upload error
        //     });
    };
    return (
        <div style={styleInputFile} >
            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                class="form-control"
                style={{ opacity: '0', flex: '1' }}
                onChange={handleFileChange}
                required
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
                <label>{props.title}</label>
            </div>
        </div>
    );
};

export default Upload;