import React, { useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
// import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { IoMdCloseCircle } from 'react-icons/io';
import { Button } from 'primereact/button';

function DicomPrint() {
    const location = useLocation();
    const { dicomUrl } = queryString.parse(location.search);

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
    return (
        <section className="ReportPage-print">
            <span style={{
                fontSize: '3em',
                color: '#000',
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
            }}>
                <IoMdCloseCircle onClick={window.close} />
            </span>
            <div style={{
                width: '80%', height: 'inherit'
                , margin: '0px auto'
            }}>
                <div ref={elementRef} style={{ width: '512px', height: '512px' }} />
                <Button type="submit" label="Print" className="fixed  w-24 bottom-2 right-5 bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2" />
            </div>
        </section>)
};

export default DicomPrint;
