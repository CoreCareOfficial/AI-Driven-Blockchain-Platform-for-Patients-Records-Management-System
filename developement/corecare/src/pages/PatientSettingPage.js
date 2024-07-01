import React, { useEffect, useState } from "react";
import '../css/settingpagestyle/patientsetting.css';
import { Container } from "react-bootstrap";
import SettingBodyLift from "../component/settingdetails/patientsetting/SettingBodyLift";
import SettingBodyMid from "../component/settingdetails/patientsetting/SettingBodyMid";
import SettingBodyRight from "../component/settingdetails/patientsetting/SettingBodyRight";
import EmergencyContact from "../component/settingdetails/patientsetting/EmergencyContact";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../Recoil/Atom";

function PatientSettingPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({
        Info: {},
        doctorInfo: {},
    });
    const [allInfo, setAllInfo] = useState({
        userInfo: {},
        healthInfo: {},
        allergies: {},
        socialInfo: [],
        emergencyContacts: [],
    });
    const [allDoctorInfo, setAllDoctorInfo] = useState({
        educational: {},
        practice: {},
        profissional: {},
        workHours: {},
    });

    const loginInfoValue = useRecoilValue(loginInfo);

    const handleAddContact = () => {
        setIsOpen(!isOpen);
    };

    const fetchData = async (url, setStateKey) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setUserData((prevState) => ({
                ...prevState,
                [setStateKey]: jsonData,
            }));
            console.log(`Success loading ${setStateKey}:`, jsonData);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        if (props.userType === 'Patient' || props.userType === 'Doctor') {
            fetchData(`http://192.168.137.1:5000/patients/getpatientinfo/${loginInfoValue.login}`, "Info");
        }
    }, [loginInfoValue.login, props.userType]);

    const { Info, doctorInfo } = userData;

    useEffect(() => {
        setAllInfo(Info);
    }, [Info]);

    useEffect(() => {
        setAllDoctorInfo(doctorInfo);
    }, [doctorInfo]);

    useEffect(() => {
        if (allInfo.patientInfo) {
            console.log('allInfo.patientInfo.patientid', allInfo.patientInfo.patientid);
            if (props.userType === 'Doctor') {
                fetchData(`http://192.168.137.1:5000/doctors/getdoctorinfo/${allInfo.patientInfo.patientid}`, "doctorInfo");
            }
            // setPatientId(allInfo.patientInfo.patientid);
        }
    }, [props.userType, allInfo.patientInfo]);

    const { patientInfo, healthInfo, allergies, socialMedia, emergencyContacts } = allInfo;
    const { educational, practice, profissional, workHours } = allDoctorInfo;

    return (
        <Container className="PatientSettingPage">
            <SettingBodyLift userType={props.userType} userInfo={patientInfo} healthInfo={healthInfo} allergies={allergies} practice={practice} />

            <Container className="PatientSettingPage_right">
                <EmergencyContact isOpen={isOpen} />

                <Container className="mid_right">
                    <SettingBodyMid userType={props.userType} socialInfo={socialMedia} profissional={profissional} educational={educational} />
                    <SettingBodyRight userType={props.userType} handleAddContact={handleAddContact} emergencyContact={emergencyContacts} workHours={workHours} />
                </Container>
            </Container>
        </Container>
    );
}

export default PatientSettingPage;
