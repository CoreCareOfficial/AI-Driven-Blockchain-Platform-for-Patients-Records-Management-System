import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function AdvanceDemo(props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({});
    const toast = useRef(null);

    const onSelect = (e) => {
        const invalidFiles = e.files.filter((file) => !isValidFileType(file));
        if (invalidFiles.length > 0) {
            setErrorMessage('Some selected files are not in the accepted formats: Images, PDF, or DICOM.');
        } else {
            setSelectedFiles(e.files);
            setErrorMessage('');
        }
        if (!props.patientid) {
            setErrorMessage("Patient id not found");
            return;
        }
        if (!props.keyuser) {
            setErrorMessage("Key user not found");
            return;
        }
        if (!props.userType) {
            setErrorMessage("User type not found");
            return;
        }
        setData({
            patientid: props.patientid,
            keyuser: props.keyuser,
            userType: props.userType,
            notes: props.notes,
        });
    };

    const validFileTypes = ['image/*', 'application/pdf', 'application/dicom'];

    const isValidFileType = (file) => {
        return validFileTypes.some((type) => {
            if (type === 'image/*') {
                return file.type.startsWith('image/');
            }
            return file.type === type;
        });
    };

    const uploadHandler = async ({ files, options }) => {
        if (!selectedFiles) {
            setErrorMessage("Please select files to upload");
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select files to upload' });
            return;
        }
        try {
            const uploadUrl = `${SERVER_URL}/diagnosis/uploadresults`;
            const formData = new FormData();
            formData.append('patientid', data.patientid);
            formData.append('keyuser', data.keyuser);
            formData.append('userType', data.userType);
            formData.append('notes', data.notes);
            // formData.append('results', selectedFiles);
            files.forEach(file => {
                formData.append('results', file);
            });

            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded * 100) / event.total);
                    if (options && options.progress) {
                        options.progress({ originalEvent: event, progress });
                    }
                }
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Files Uploaded Successfully' });
                        if (options && options.clear) {
                            options.clear();
                        }
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Uploading Files' });
                    }
                }
            };

            xhr.open('POST', uploadUrl, true);
            xhr.send(formData);
        } catch (error) {
            setErrorMessage(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Uploading Files' });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <FileUpload
                    name="demo[]"
                    multiple
                    accept="image/*,application/pdf,application/dicom"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                    onSelect={onSelect}
                    customUpload
                    uploadHandler={uploadHandler}
                />
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
        </>
    );
}
