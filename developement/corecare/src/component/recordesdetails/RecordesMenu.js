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
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const useOptimistic = (initialValue, callback) => {
    const [value, setValue] = useState(initialValue);

    const updateValue = async (newValue) => {
        const previousValue = value;
        setValue(newValue);
        try {
            await callback(newValue);
        } catch (error) {
            setValue(previousValue);
        }
    };

    return [value, updateValue];
};

function RecordesMenu(props) {
    const userInfoValue = useRecoilValue(loginInfo);
    const [selectedFile, setSelectedFile] = useState({ id: '', data: {} });
    const patientId = props.patientId ? props.patientId : userInfoValue.patientId;
    useEffect(() => {
        setSelectedFile(props.file);
    }, [props.file, selectedFile])

    const fetchFile = async (id, action) => {
        try {
            const response = await fetch(`${SERVER_URL}/records/getresult/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
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
                action === 'open'
                    ? window.open(`/read-pdf?${query}`, '_blank')
                    : window.open(`/print-pdf?${query}`, '_blank');
            } else if (jsonData.filetype === 'dicom') {
                const byteArray = new Uint8Array(atob(jsonData.data).split("").map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'application/dicom' });
                const fileUrl = URL.createObjectURL(blob);
                const query = queryString.stringify({ dicomUrl: fileUrl });
                action === 'open'
                    ? window.open(`/view-dicom?${query}`, '_blank')
                    : window.open(`/print-dicom?${query}`, '_blank');
            } else {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Unsupported file type' });
            }
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: `"Error:, ${err}` });
        }
    };

    const fetchPrescption = async (prescribedMedicine, action) => {
        if (!prescribedMedicine) {
            alert('No medicine prescribed');
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/get/prescription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prescribedMedicine),
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading prescription' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            const query = queryString.stringify({ info: JSON.stringify(jsonData), type: 'prescription', action: action });
            window.open(`/open-report?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading prescription' });
        }
    };

    const fetchlab = async (prescribedLabtests, action) => {
        if (!prescribedLabtests) {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No lab tests prescribed' });
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/get/labtest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prescribedLabtests),
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading lab test' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            const query = queryString.stringify({ info: JSON.stringify(jsonData), type: 'lab', action: action });
            window.open(`/open-report?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading lab test' });
        }
    };
    const fetchRad = async (prescribedRadiologies, action) => {
        if (!prescribedRadiologies) {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No radiology tests prescribed' });
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/get/radiology`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prescribedRadiologies),
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading radiology test' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            const query = queryString.stringify({ info: JSON.stringify(jsonData), type: 'rad', action: action });
            window.open(`/open-report?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading radiology test' });
        }
    };
    const fetchSummary = async (action) => {
        try {
            const response = await fetch(`${SERVER_URL}/records/get/savedsummary/${selectedFile.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading Summary' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            const query = queryString.stringify({ info: JSON.stringify(jsonData), type: 'summarized', action: action });
            window.open(`/open-report?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading Summary' });
        }
    };
    const fetchGeneralReport = async (action) => {
        if (patientId === '') {
            props.toast({ severity: 'error', summary: 'Error', detail: 'You Should Login again' });
            return;
        }
        const data = {
            patientid: patientId,
            recordid: selectedFile.id
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/get/generalreport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading General Report' });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            const query = queryString.stringify({ info: JSON.stringify(jsonData), type: 'general', action: action });
            window.open(`/open-report?${query}`, '_blank');
        } catch (err) {
            console.error("Error:", err);
            props.toast({ severity: 'error', summary: 'Error', detail: 'Error loading General Report' });
        }
    };


    const handleOpenFile = async () => {
        if (props.handleMenuClick)
            props.handleMenuClick();
        if (selectedFile.id === '') {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No Record selected' });
            return;
        }
        if (!selectedFile.data) {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No data Record selected' });
            return;
        }
        if (selectedFile.data['type'] === "Lab Result" || selectedFile.data['type'] === "Radiology Result") {
            fetchFile(selectedFile.id, 'open');
        } else if (selectedFile.data['type'] === "Prescription") {
            fetchPrescption(selectedFile.data['prescribedMedicine'], 'open');
        } else if (selectedFile.data['type'] === "Record") {
            if (props.handleExpanded)
                props.handleExpanded(selectedFile.id);
        } else if (selectedFile.data['type'] === "prescribed lab test") {
            fetchlab(selectedFile.data['prescribedLabtests'], 'open');
        }
        else if (selectedFile.data['type'] === "prescribed radiology test") {
            fetchRad(selectedFile.data['prescribedRadiologies'], 'open');
        } else if (selectedFile.data['type'] === "Summary") {
            fetchSummary('open');
        } else if (selectedFile.data['type'] === "General Report") {
            fetchGeneralReport('open');
        }

    };

    const handlePrint = async () => {
        if (props.handleMenuClick)
            props.handleMenuClick();
        if (selectedFile.id === '') {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No Record selected' });
            return;
        }
        if (!selectedFile.data) {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No data Record selected' });
            return;
        }
        if (selectedFile.data['type'] === "Lab Result" || selectedFile.data['type'] === "Radiology Result") {
            fetchFile(selectedFile.id, 'print');
        } else if (selectedFile.data['type'] === "Prescription") {
            fetchPrescption(selectedFile.data['prescribedMedicine'], 'print');
        } else if (selectedFile.data['type'] === "prescribed lab test") {
            fetchlab(selectedFile.data['prescribedLabtests'], 'print');
        }
        else if (selectedFile.data['type'] === "prescribed radiology test") {
            fetchRad(selectedFile.data['prescribedRadiologies'], 'print');
        } else if (selectedFile.data['type'] === "Summary") {
            fetchSummary('print');
        } else if (selectedFile.data['type'] === "General Report") {
            fetchGeneralReport('print');
        }
    };


    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(props.patientId ? props : loginInfo, async (newUserInfoValue) => {
        props.toast({ severity: 'info', summary: 'Processing', detail: 'Summarizing Medical Record, please wait...', life: 5000 });

        const data = !props.isRecord ? {
            patientid: newUserInfoValue.patientId,
            resultid: selectedFile.id
        } : {
            patientid: newUserInfoValue.patientId,
            recordid: selectedFile.id
        }
        try {
            const response = await fetch(`${SERVER_URL}/ai/${props.isRecord ? 'summarizeonerecord' : 'summarizresult'}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                if (props.handleSummarize)
                    props.handleSummarize(data);
                // navigate('/signup/password-step');
                // Optionally show a success toast
                props.toast({ severity: 'success', summary: 'Success', detail: 'Summarized Medical record successful' });
            } else {
                const errorData = await response.json();
                props.toast({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
                throw new Error(errorData.message || 'Invalid Data');
            }
        } catch (error) {
            console.error(error.message);
            props.toast({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }


    });
    const handleSummarizeRecord = async () => {
        if (props.handleMenuClick)
            props.handleMenuClick();
        if (patientId === '' && selectedFile.id === '') {
            props.toast({ severity: 'error', summary: 'Error', detail: 'Sorry Error Occured,Session expired please login in again' });
            return;
        }
        try {
            await setUserInfoOptimistic(props.patientId ? props : userInfoValue);
        } catch (error) {
            props.toast({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
            console.error(error.message);
        }

    };

    const fetchStar = async (data, api) => {
        if (props.handleMenuClick)
            props.handleMenuClick();
        try {
            const response = await fetch(`${SERVER_URL}/records/${api}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                props.toast({ severity: 'error', summary: 'Error', detail: `Error ${selectedFile.data.type} starred` });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            props.toast({ severity: 'success', summary: 'Success', detail: selectedFile.data.star ? `${selectedFile.data.type} Unstarred` : `${selectedFile.data.type} Starred` });
            props.refresh(selectedFile.id, true);
        }
        catch (error) {
            console.error(error.message);
            props.toast({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    }
    const handleStar = async () => {
        if (selectedFile.id === '') {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No file selected' });
            return;
        }
        if (!selectedFile.data) {
            props.toast({ severity: 'error', summary: 'Error', detail: 'No data file selected' });
            return;
        }
        if (selectedFile.data['type'] === "Record" || selectedFile.data['type'] === "General Report") {
            const data = {
                recordid: selectedFile.id,
                star: !selectedFile.data.star
            }
            fetchStar(data, 'updaterecordstar');
        }
        else if (selectedFile.data['type'] === "Prescription") {
            const data = {
                prescribedMedicine: selectedFile.data['prescribedMedicine'],
                star: !selectedFile.data.star
            }
            fetchStar(data, 'updateprescriptionstar');
        }
        else if (selectedFile.data['type'] === "Lab Result" || selectedFile.data['type'] === "Radiology Result") {
            const data = {
                resultid: selectedFile.id,
                star: !selectedFile.data.star
            }
            fetchStar(data, 'updateresultstar');
        }
        else if (selectedFile.data['type'] === "prescribed lab test") {
            const data = {
                mainid: selectedFile.data['mainid'],
                star: !selectedFile.data.star
            }
            fetchStar(data, 'updatelabteststar');
        }
        else if (selectedFile.data['type'] === "prescribed radiology test") {
            const data = {
                mainid: selectedFile.data['mainid'],
                star: !selectedFile.data.star
            }
            fetchStar(data, 'updateradiologystar');
        }
        else {
            props.toast({ severity: 'error', summary: 'Error', detail: 'This type of files can not be starred' })
        }
    }

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
                    {(selectedFile.data['type'] === "Lab Result" || selectedFile.data['type'] === "Radiology Result" || selectedFile.data['type'] === 'Record') &&
                        <Button variant="" style={{ transition: '0.7s ease' }} onClick={handleSummarizeRecord}>
                            <span className="span"><MdOutlineSummarize /></span> Summarize
                        </Button>}{' '}
                    {!props.isRecord && <Button variant="" style={{ transition: '0.7s ease' }} onClick={handlePrint}>
                        <span className="span"><MdOutlineLocalPrintshop /></span> Print
                    </Button>}{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }}>
                        <span className="span"><MdOutlineNoteAlt /></span> Write Note
                    </Button>{' '}
                    <Button variant="" style={{ transition: '0.7s ease' }} onClick={handleStar}>
                        <span className="span"><MdOutlineStarBorder /></span> {selectedFile.data.star ? `Unstar` : `Star`}
                    </Button>{' '}
                </DynamicCard>
            </div>
        </>
    );
}

export default RecordesMenu;
