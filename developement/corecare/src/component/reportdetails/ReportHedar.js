import React, { useState, useEffect } from "react";
import { DynamicInput } from "../settingdetails/TextFormSetting";
import { Image } from "react-bootstrap";
import profileImage from '../../assets/ahmed.jpg';

function ReportHeader(props) {

    const [info, setInfo] = useState(null);
    useEffect(() => {
        setInfo(props.info);
    }, [props.info])

    if (!info) {
        return <div>Loading...</div>;
    }


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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <>
            <div className="ReportHeader">

                <div className="ReportHeader-container">

                    <div className="ReportHeader-left">
                        <h1 className="h_1">{`${info.doctorPersonInfo.firstname} ${info.doctorPersonInfo.lastname}`}</h1>
                        <h1 className="h_1">{info.doctorInfo.specialization}</h1>
                        <h1 className="h_1">{info.doctorInfo.locationofwork}</h1>
                    </div>

                    <Image
                        src={profileImage}
                        thumbnail
                        roundedCircle
                        style={{ width: '130px', height: '130px' }}
                    />

                    <div className="ReportHeader-right">
                        <h1 className="h_1">{`${info.doctorPersonInfo.country}`}</h1>
                        <h1 className="h_1">{`${info.doctorPersonInfo.phonenumber}`}</h1>
                        <h1 className="h_1">time 8:00am - 2:00pm</h1>
                    </div>
                </div>

                <hr style={{ color: '#000', height: '2px', margin: '5px auto', width: '90%' }} />

                <div className="ReportHeader-Pat-det-container">
                    <div
                        style={{
                            width: '40%',
                            minHeight: '10vh',
                            margin: '5px',
                        }}>
                        <DynamicInput label="Name : " type="text" disabled={true} value={`${info.patientInfo.firstname} ${info.patientInfo.lastname}`} />
                        <DynamicInput label="Age : " type="text" disabled={true} value={calculateAge(info.patientInfo.dateofbirth)} />
                    </div>

                    <div
                        style={{
                            width: '40%',
                            minHeight: '10vh',
                            margin: '5px',
                        }}>
                        <DynamicInput label="Sex : " type="text" disabled={true} value={info.patientInfo.sex} />
                        <DynamicInput label="Date : " type="text" disabled={true}
                            value={formatDate(info.prescriptions ? info.prescriptions[0].prescriptiondate : info.reportdate)}
                        />
                    </div>

                    <div
                        style={{
                            width: '100%',
                            minHeight: '8vh',
                            margin: '5px',
                        }}>
                        <DynamicInput label="Diagnosis : " type="text" disabled={true} value={info.diagnosis.diagnosis} />
                    </div>

                </div>

            </div>
        </>
    );
}
export default ReportHeader;