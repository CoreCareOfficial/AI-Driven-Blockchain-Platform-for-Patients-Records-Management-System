import React, { useEffect, useRef, useState } from "react";
import '../css/settingpagestyle/patientsetting.css';
import { Container } from "react-bootstrap";
import SettingBodyLift from "../component/settingdetails/patientsetting/SettingBodyLift";
import SettingBodyMid from "../component/settingdetails/patientsetting/SettingBodyMid";
import SettingBodyRight from "../component/settingdetails/patientsetting/SettingBodyRight";
import EmergencyContact from "../component/settingdetails/patientsetting/EmergencyContact";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../Recoil/Atom";
import { Toast } from "primereact/toast";

function PatientSettingPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    // const [isAdded, setIsAdded] = useState(false);
    const toast = useRef(null);

    const [userData, setUserData] = useState({
        Info: {},
        doctorInfo: {},
        facilityInfo: {},
    });
    const [allInfo, setAllInfo] = useState({
        userInfo: {},
        healthInfo: {},
        allergies: {},
        socialInfo: [],
        emergencyContacts: [],
    });
    const [allDoctorInfo, setAllDoctorInfo] = useState({
        doctorid: '',
        educational: {},
        practice: {},
        profissional: {},
        workHours: {},
    });
    const [allFacilityInfo, setAllFacilityInfo] = useState({
        healthcareProviderInfo: {},
        facilitySocialMedia: [],
        departments: [],
        services: [],
        ficilityWorkHours: [],
        visitHours: [],
    });

    const loginInfoValue = useRecoilValue(loginInfo);

    const handleAddContact = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };
    const handleAddContactSuccessful = (isAdded, message) => {
        // setIsAdded();
        isAdded ?
            toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 })
            :
            toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
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
        } else {
            fetchData(`http://192.168.137.1:5000/healthcareproviders/gethealtcareinfo/${loginInfoValue.login}`, "facilityInfo");
        }
    }, [loginInfoValue.login, props.userType]);

    const { Info, doctorInfo, facilityInfo } = userData;

    useEffect(() => {
        setAllInfo(Info);
    }, [Info]);

    useEffect(() => {
        setAllDoctorInfo(doctorInfo);
    }, [doctorInfo]);

    useEffect(() => {
        setAllFacilityInfo(facilityInfo);
    }, [facilityInfo]);

    useEffect(() => {
        if (allInfo.patientInfo) {
            console.log('allInfo.patientInfo.patientid', allInfo.patientInfo.patientid);
            if (props.userType === 'Doctor') {
                fetchData(`http://192.168.137.1:5000/doctors/getdoctorinfo/${allInfo.patientInfo.patientid}`, "doctorInfo");
            }
        }
    }, [props.userType, allInfo.patientInfo]);

    const { patientInfo, healthInfo, allergies, socialMedia, emergencyContacts } = allInfo;
    const { doctorid, educational, practice, profissional, workHours } = allDoctorInfo;
    const { healthcareProviderInfo, facilitySocialMedia, departments, services, ficilityWorkHours, visitHours } = allFacilityInfo;

    return (
        <Container className="PatientSettingPage">
            <Toast ref={toast} />
            <SettingBodyLift userType={props.userType} userInfo={patientInfo} healthInfo={healthInfo} allergies={allergies} practice={practice} healthcareProviderInfo={healthcareProviderInfo} doctorid={doctorid} />

            <Container className="PatientSettingPage_right">
                <EmergencyContact isOpen={isOpen} handleAddContact={handleAddContact} userid={patientInfo ? patientInfo.patientid : ''} handleAddContactSuccessful={handleAddContactSuccessful} />
                <Container className="mid_right">
                    <SettingBodyMid userType={props.userType} socialInfo={socialMedia ? socialMedia : facilitySocialMedia ? facilitySocialMedia : null} profissional={profissional} educational={educational} departments={departments} services={services} healthcareProviderInfo={healthcareProviderInfo} />
                    <SettingBodyRight userType={props.userType} handleAddContact={handleAddContact} emergencyContact={emergencyContacts} workHours={workHours ? workHours : ficilityWorkHours} visitHours={visitHours} />
                </Container>
            </Container>
        </Container>
    );
}

export default PatientSettingPage;
