import { Button } from "primereact/button";
import ImageNameContainer from "../UserDetails/ImageNameContainer";
import PatientHealtInfo from "./PatientHealtInfo";
import { MdSummarize } from "react-icons/md";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import ConfirmedDialog from "../../utiles/ConfirmedDialog";
import dotenv from 'dotenv';
dotenv.config();
const SERVER_URL = process.env.SERVER_URL;

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
function DoctorBodyLeft(props) {
    const toast = useRef(null);
    const [isOpenSummarize, setIsOpenSummarize] = useState(false);
    const [dataSummarize, setDataSummarize] = useState({ summary: '' });

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

    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(props, async (newUserInfoValue) => {

        toast.current.show({ severity: 'info', summary: 'Processing', detail: 'Summarizing Medical Records, please wait...', life: 5000 });

        const data = {
            patientid: newUserInfoValue.patientid
        }
        try {
            const response = await fetch(`${SERVER_URL}/ai/summarizerecords`, {
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
        if (props.patientid === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Sorry Error Occured, Session expired please login in again' });
            return;
        }
        console.log(props.patientid);
        try {
            await setUserInfoOptimistic(props);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }

    }
    const handleSaveSummarize = async () => {
        if (props.patientid === '' && dataSummarize.summary === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return;
        }
        const data = {
            patientid: props.patientid,
            summary: dataSummarize.summary,
            recordid: dataSummarize.recordid,
            resultid: dataSummarize.resultid,
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/savesummary`, {
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

        <div className="flex flex-col bg-[#272C34] rounded-2xl my-5 mx-3 p-3 justify-between ">
            <Toast ref={toast} />
            <ImageNameContainer incname="flex-col px-5" icname="m-auto" ncname="text-center" image={props.image} display={true} username={props.username} name={props.name} gender={props.gender} age={props.age} />
            <PatientHealtInfo healthInfo={props.healthInfo} allergies={props.allergies} />
            <Button label="Summarize Condition" icon={<MdSummarize />} className="bg-white text-[#3146FF] font-bold rounded-[10px] p-2 m-auto w-3/4" onClick={handleSummarizeRecords} />
            <ConfirmedDialog show={isOpenSummarize} handleClose={() => setIsOpenSummarize(!isOpenSummarize)} message={parseRecordString(dataSummarize.summary)} handleOk={handleSaveSummarize} title='AI Summarizing' isSummary={true} />
        </div>
    );
}

export default DoctorBodyLeft