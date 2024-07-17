import React, { useRef, useState } from "react";
import Flex_Container from '../bootcomponent/flex_Container';
import Form from 'react-bootstrap/Form';
import { MdGridView } from "react-icons/md";
import { MdSummarize } from "react-icons/md";
import { HiPlus } from "react-icons/hi2";
import DynamicCard from "../bootcomponent/DynamicCard";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { MdViewList } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
import ConfirmedDialog from "../../utiles/ConfirmedDialog";
import { Toast } from "primereact/toast";

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

function RecordesSearch({ view, handleViewClick, handleCreateAccessKeyClick }) {

    const userInfoValue = useRecoilValue(loginInfo);
    const [isOpenSummarize, setIsOpenSummarize] = useState(false);
    const [dataSummarize, setDataSummarize] = useState({ summary: '' });
    const toast = useRef(null);

    const handleSummarize = (data) => {
        setDataSummarize(data);
        setIsOpenSummarize(!isOpenSummarize);
    }
    const parseRecordString = (recordString) => {
        let htmlContent = recordString
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\* (.*?)/g, '<li>$1</li>') // Replace bullet points with list items
            .replace(/\n/g, '<br>'); // Replace newlines with <br>

        // Wrap list items with <ul>
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

        // Remove unnecessary <br> before <ul> and after </ul>
        htmlContent = htmlContent.replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');

        return htmlContent;
    };


    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(loginInfo, async (newUserInfoValue) => {
        console.log(newUserInfoValue.patientId);
        toast.current.show({ severity: 'info', summary: 'Processing', detail: 'Summarizing Medical Records, please wait...', life: 5000 });

        const data = {
            patientid: newUserInfoValue.patientId
        }
        try {
            const response = await fetch("http://192.168.137.1:5000/ai/summarizerecords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                handleSummarize(data);
                // navigate('/signup/password-step');
                // Optionally show a success toast
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Summarized Medical records successful' });
            } else {
                const errorData = await response.json();
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
                throw new Error(errorData.message || 'Invalid Data');
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }


    });
    const handleSummarizeRecords = async () => {
        if (userInfoValue.patientId === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Sorry Error Occured, Session expired please login in again' });
            return;
        }
        console.log(userInfoValue.patientId);
        try {
            await setUserInfoOptimistic(userInfoValue);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }

    }

    const handleSaveSummarize = async () => {
        if (userInfoValue.patientId === '' && dataSummarize.summary === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return;
        }
        const data = {
            patientid: userInfoValue.patientId,
            summary: dataSummarize.summary,
            recordid: dataSummarize.recordid,
            resultid: dataSummarize.resultid,
        }
        try {
            const response = await fetch(`http://192.168.137.1:5000/records/savesummary`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Summary Saved' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Summary Saved' });
        }
        console.log('Save Summarize');
        setIsOpenSummarize(!isOpenSummarize);
    }

    return (
        <>
            <Toast ref={toast} />
            <DynamicCard name="RecordesSearch">
                <Flex_Container>
                    <Form className="RecordesSearch_form">
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                            <div className="RecordesSearch_form_div">
                                <span className="record_sec_SI"><AiOutlineSearch /></span>
                                <Form.Control type="text" placeholder="" style={{ backgroundColor: '#272c34' }} />
                            </div>
                        </Form.Group>
                    </Form>

                    <div className="RecordesSearch_button">
                        {/* <Link to="" className="link_route"> */}
                        <Button variant="dark" style={{ transition: '0.7s ease' }}
                            onClick={handleViewClick}>
                            <span>{view ? <MdGridView /> : <MdViewList />}</span>
                            View
                        </Button>{' '}
                        {/* </Link> */}

                        {/* <Link to=""> */}
                        <Button variant="light" style={{ transition: '0.7s ease', color: '#3146ff' }} onClick={handleSummarizeRecords}>
                            <span style={{ color: '#3146ff' }}><MdSummarize /></span>
                            Summarize
                        </Button>{' '}
                        {/* </Link> */}

                        {/* <Link to=""> */}
                        <Button variant="primary" style={{ transition: '0.7s ease' }} onClick={(e) => handleCreateAccessKeyClick(e)}>
                            <span><HiPlus /></span>
                            Create
                        </Button>{' '}
                        {/* </Link> */}

                    </div>
                </Flex_Container>
            </DynamicCard>
            <ConfirmedDialog show={isOpenSummarize} handleClose={() => setIsOpenSummarize(!isOpenSummarize)} message={parseRecordString(dataSummarize.summary)} handleOk={handleSaveSummarize} title='AI Summarizing' isSummary={true} />
        </>
    );
}
export default RecordesSearch;