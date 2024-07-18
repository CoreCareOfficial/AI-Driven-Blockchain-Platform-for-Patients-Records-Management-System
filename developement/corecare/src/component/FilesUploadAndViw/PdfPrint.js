
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { IoMdCloseCircle } from 'react-icons/io';
import { Button } from 'primereact/button';

export function PdfPrint() {
    const location = useLocation();
    const { pdfUrl } = queryString.parse(location.search);
    if (!pdfUrl) {
        return <div>No PDF URL provided</div>;
    } else {
        console.log('pdf', pdfUrl);
    }

    const handlePrint = (e) => {
        // e.preventDefault();
        // window.print();
        console.log('print');
    }
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
                <div style={{ height: '750px' }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfUrl} />
                    </Worker>
                </div>
                <Button type="submit" label="Print" className="fixed  w-24 bottom-2 right-5 bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2" onClick={handlePrint} />
            </div>
        </section>)
};

export default PdfPrint;