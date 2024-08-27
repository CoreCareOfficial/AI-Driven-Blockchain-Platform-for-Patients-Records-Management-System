// src/components/PdfViewer.js

import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


const PdfViewer = () => {
    const location = useLocation();
    const { pdfUrl } = queryString.parse(location.search);

    if (!pdfUrl) {
        return <div>No PDF URL provided</div>;
    }

    return (
        <div style={{ height: '750px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
