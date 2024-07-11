// src/components/DicomViewer.js

import React, { useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
// import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';

const DicomViewer = ({ dicomUrl }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        cornerstone.enable(element);

        const loadAndViewImage = async () => {
            try {
                const response = await fetch(dicomUrl);
                const arrayBuffer = await response.arrayBuffer();
                const byteArray = new Uint8Array(arrayBuffer);
                const imageId = `dicomweb://192.168.137.1/${dicomUrl}`;

                cornerstone.registerImageLoader('dicomweb', (imageId) => {
                    const image = dicomParser.parseDicom(byteArray);
                    return Promise.resolve(image);
                });

                const image = await cornerstone.loadImage(imageId);
                cornerstone.displayImage(element, image);
            } catch (error) {
                console.error('Error loading DICOM image:', error);
            }
        };

        loadAndViewImage();

        return () => {
            cornerstone.disable(element);
        };
    }, [dicomUrl]);

    return <div ref={elementRef} style={{ width: '512px', height: '512px' }} />;
};

export default DicomViewer;
