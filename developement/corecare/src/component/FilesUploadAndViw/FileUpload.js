// src/components/FileUpload.js

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const FileUpload = () => {
    const [file, setFile] = useState(null);
    // const navigate = useNavigate();


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        const fileUrl = URL.createObjectURL(file)
        const query = queryString.stringify({ pdfUrl: fileUrl });
        window.open(`/read-pdf?${query}`, '_blank');

        // navigate('/read-pdf', { state: { pdfUrl: fileUrl } });

    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
