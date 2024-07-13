import React, { useEffect, useState } from "react";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Button } from "react-bootstrap";
import { MdOutlineFileOpen } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import queryString from 'query-string';

function RecordesMenu(props) {
    // const selectedFile = props.file || { id: '', data: {} };
    const [selectedFile, setSelectedFile] = useState({ id: '', data: {} });

    useEffect(() => {
        setSelectedFile(props.file);
    }, [props.file, selectedFile])

    const fetchFile = async (id) => {
        try {
            const response = await fetch(`http://192.168.137.1:5000/records/getresult/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log(`Success loading:`, jsonData);

            if (jsonData.filetype === 'pdf') {
                const byteCharacters = atob(jsonData.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const fileUrl = URL.createObjectURL(blob);
                const query = queryString.stringify({ pdfUrl: fileUrl });
                window.open(`/read-pdf?${query}`, '_blank');
            } else if (jsonData.filetype === 'dicom') {
                const byteArray = new Uint8Array(atob(jsonData.data).split("").map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'application/dicom' });
                const fileUrl = URL.createObjectURL(blob);
                const query = queryString.stringify({ dicomUrl: fileUrl });
                window.open(`/view-dicom?${query}`, '_blank');
            } else {
                alert('Unsupported file type');
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const fetchPrescption = async (prescribedMedicine) => {
        if (!prescribedMedicine) {
            alert('No medicine prescribed');
            return;
        }
        try {
            const response = await fetch(`http://192.168.137.1:5000/records/get/prescription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prescribedMedicine),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log(`Success loading:`, jsonData);
            const query = queryString.stringify({ prescriptionsInfo: JSON.stringify(jsonData) });
            window.open(`/prescription?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            alert('Error loading prescription');
        }
    };

    const handleOpenFile = async () => {
        if (selectedFile.id === '') {
            alert('No file selected');
            return;
        }
        if (!selectedFile.data) {
            alert('No data file selected');
            return;
        }
        if (selectedFile.data['type'] === "Lab Result" || selectedFile.data['type'] === "Radiology Result") {
            fetchFile(selectedFile.id);
        } else if (selectedFile.data['type'] === "Prescription") {
            fetchPrescption(selectedFile.data['prescribedMedicine']);
        }

    };

    return (
        <>
            <div className="RecordesMen" style={{
                top: `${props.top}px`,
                right: `${props.right}px`,
                display: `${props.open ? 'block' : 'none'}`
            }}>
                <DynamicCard name="RecordesMen_card">
                    <span onClick={props.handleMenuClick} className="RecordesMen_close"><IoClose /></span>
                    <Button variant="" style={{ transition: '0.7s ease' }} onClick={handleOpenFile}>
                        <span className="span"><MdOutlineFileOpen /></span> Open
                    </Button>{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }}>
                        <span className="span"><MdOutlineSummarize /></span> Summarize
                    </Button>{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }}>
                        <span className="span"><MdOutlineLocalPrintshop /></span> Print
                    </Button>{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }}>
                        <span className="span"><MdOutlineNoteAlt /></span> Write Note
                    </Button>{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }}>
                        <span className="span"><MdOutlineStarBorder /></span> Stars
                    </Button>{' '}
                </DynamicCard>
            </div>
        </>
    );
}

export default RecordesMenu;
