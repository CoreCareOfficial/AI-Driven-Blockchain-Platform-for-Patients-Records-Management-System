import { Button } from "primereact/button";
import ImageNameContainer from "../UserDetails/ImageNameContainer";
import PatientHealtInfo from "./PatientHealtInfo";
import { MdSummarize } from "react-icons/md";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
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
function DoctorBodyLeft(props) {
    const toast = useRef(null);
    const userInfoValue = useRecoilValue(loginInfo);

    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(loginInfo, async (newUserInfoValue) => {

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
    return (

        <div className="flex flex-col bg-[#272C34] rounded-2xl my-5 mx-3 p-3 justify-between ">
            <Toast ref={toast} />
            <ImageNameContainer incname="flex-col px-5" icname="m-auto" ncname="text-center" image={props.image} display={true} username={props.username} name={props.name} gender={props.gender} age={props.age} />
            <PatientHealtInfo />
            <Button label="Summarize Condition" icon={<MdSummarize />} className="bg-white text-[#3146FF] font-bold rounded-[10px] p-2 m-auto w-3/4" onClick={handleSummarizeRecords} />
        </div>
    );
}

export default DoctorBodyLeft