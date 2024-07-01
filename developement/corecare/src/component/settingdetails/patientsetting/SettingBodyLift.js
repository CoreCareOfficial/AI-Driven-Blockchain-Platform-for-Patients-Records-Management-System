import React, { useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { Card } from "react-bootstrap";
import { SettingForm, SettingInput, SettingSelect, SettingCountry, UpdateImage } from "../TextFormSetting";
import { MdModeEdit } from "react-icons/md";
import defaultPic from '../../../assets/user_signup.png';

function SettingBodyLift(props) {
    const {
        userInfo = {
            firstname: "",
            secondname: "",
            thirdname: "",
            lastname: "",
            phonenumber: "",
            address: "",
            username: "",
            country: "",
            job: "",
            sex: "",
            dateOfBirth: "0000-01-01",
            status: "",
            bloodtype: "",
            personalphoto: null
        },
        healthInfo = { weight: "", height: "" },
        allergies = { allergyname: "" },
        practice = {
            practicelocation: "",
            affiliations: "",
            practicehours: "",
            languagesspoken: ""
        }
    } = props;

    console.log('userInfo', userInfo);
    console.log('healthInfo', healthInfo);
    console.log('allergies', allergies);

    const [General, setGeneral] = useState(true);
    const toggleEditGeneral = () => {
        setGeneral(!General);
    };

    const [Health, setHealth] = useState(true);
    const toggleEditHealth = () => {
        setHealth(!Health);
    };

    const [Practice, setPractice] = useState(true);
    const toggleEditPractice = () => {
        setPractice(!Practice);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };


    return (
        <>
            <DynamicCard name="SettingBodyLift">
                <UpdateImage img={userInfo.personalphoto} />
                <Card.Title style={{
                    textAlign: 'center',
                    color: "white",
                    fontSize: '1.5em',
                    marginTop: '5px',
                }}>{`${userInfo.username}`}</Card.Title>

                <SettingForm name="SettingForm_form" legend="General Information" btn="Save Change" show={General} TheEvent={toggleEditGeneral}>
                    <span style={{
                        color: 'white',
                        position: 'absolute', right: '40px', top: '-15px',
                        fontSize: '1.3em',
                        borderRadius: '20px',
                        padding: '5px',
                        backgroundColor: '#272c34',
                        cursor: 'pointer',
                    }} onClick={toggleEditGeneral}
                    ><MdModeEdit /></span>
                    <SettingInput
                        class_name="SettingInput"
                        type="text"
                        name="full-name"
                        label="FullName:"
                        placeholder=""
                        disabled={General}
                        value={`${userInfo.firstname} ${userInfo.secondname} ${userInfo.thirdname} ${userInfo.lastname}`}
                    />
                    <SettingInput
                        class_name="SettingInput"
                        type="text"
                        name="phone-number"
                        label="Phone Number:"
                        placeholder=""
                        disabled={General}
                        value={userInfo.phonenumber}
                    />
                    <SettingInput class_name="SettingInput" type="text" name="address" label="Address:" placeholder="" disabled={General} value={userInfo.address} />
                    <SettingCountry label="Country:" name="country" disabled={General} value={userInfo.country} />
                    {props.userType !== "Hospital" && props.userType !== "Radiology" && props.userType !== "Laboratory" && props.userType !== "Pharmacy" ? (
                        <>
                            <SettingInput class_name="SettingInput" type="text" name="job" label="Job:" placeholder="" disabled={General} value={userInfo.job} />
                            <SettingSelect items={['Male', 'Female']} label="Sex:" disabled={General} value={userInfo.sex} />
                            <SettingInput class_name="SettingInput" type="date" name="date" label="Date Of Birth:" placeholder="" disabled={General} value={formatDate(userInfo.dateOfBirth)} />
                            <SettingSelect items={['Single', 'Married']} label="Status:" name="status" disabled={General} value={userInfo.status} />
                        </>
                    ) : null}
                </SettingForm>

                {props.userType === "Patient" || props.userType === "Doctor" ? (
                    <SettingForm name="SettingForm_form" legend="Health Information" btn="Save Change" show={Health} TheEvent={toggleEditHealth}>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '40px', top: '-15px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                        }} onClick={toggleEditHealth}
                        ><MdModeEdit /></span>
                        <SettingSelect items={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} name="bold-type" label="Blood Type:" disabled={Health} value={userInfo.bloodtype} />
                        <SettingInput class_name="SettingInput" type="number" name="weight" label="Weight:" placeholder="" disabled={Health} value={healthInfo.weight} />
                        <SettingInput class_name="SettingInput" type="number" name="height" label="Height:" placeholder="" disabled={Health} value={healthInfo.height} />
                        <SettingInput class_name="SettingInput" type="text" name="allergies" label="Allergies:" placeholder="" disabled={Health} value={allergies.allergyname} />
                    </SettingForm>
                ) : null}

                {props.userType === "Doctor" ? (
                    <SettingForm name="SettingForm_form" legend="Practice Information" btn="Save Change" show={Practice} TheEvent={toggleEditPractice}>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '40px', top: '-15px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                        }} onClick={toggleEditPractice}
                        ><MdModeEdit /></span>
                        <SettingInput class_name="SettingInput" type="text" name="Practice Location" label="Location:" placeholder="" disabled={Practice} value={practice.practicelocation} />
                        <SettingInput class_name="SettingInput" type="text" name="Hospital Affiliation" label="Affiliation:" placeholder="" disabled={Practice} value={practice.affiliations} />
                        <SettingInput class_name="SettingInput" type="number" name="Practice Hourse" label="Hours:" placeholder="" disabled={Practice} value={practice.practicehours} />
                        <SettingInput class_name="SettingInput" type="text" name="Language" label="Language:" placeholder="" disabled={Practice} value={practice.languagesspoken} />
                    </SettingForm>
                ) : null}

            </DynamicCard>
        </>
    );

}

export default SettingBodyLift;
