import DoctorBodyLeft from "./DoctorBodyLeft";
import DoctorBodyRight from "./DoctorBodyRight";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import defaultPic from '../../assets/user_signup.png'

function DoctorBody(props) {
    const toast = useRef(null);
    const [info, setInfo] = useState({});
    const [patientinfo, setPatientInfo] = useState({});

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            if (!props.patientid) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Error has happened' });
                return;
            }
            try {
                const response = await fetch(`http://192.168.137.1:5000/healthinfo/personalhealthinfo/${props.patientid}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: `HTTP error! Status: ${response.status}` });
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setInfo(jsonData);
            }
            catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: error.message });
                console.error(error.message);
            }
        }
        fetchDoctorInfo();
    }, [props.patientid]);

    useEffect(() => {
        setPatientInfo(info.patientinfo);
    }, [info]);

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    return (
        <>
            <Toast ref={toast} />
            <div className="doctor-body-top flex flex-row text-white justify-between">
                <DoctorBodyLeft
                    image={patientinfo ? `data:image/jpeg;base64,${patientinfo.personalphoto}` : defaultPic}
                    username={patientinfo && patientinfo.username}
                    name={patientinfo && `${patientinfo.firstname} ${patientinfo.lastname}`}
                    gender={patientinfo && patientinfo.sex}
                    age={patientinfo && calculateAge(patientinfo.dateofbirth)}
                    healthInfo={info && info.healthinfo}
                    patientid={props.patientid}
                />
                <DoctorBodyRight
                    patientid={props.patientid}
                    keyuser={props.keyuser}
                    userType={props.userType}
                    medication={info && info.medication}
                    pastCondition={info && info.pastCondition}
                    response={info && info.response}
                />
            </div>
        </>
    );
}

export default DoctorBody