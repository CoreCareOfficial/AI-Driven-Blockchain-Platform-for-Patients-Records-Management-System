import React, { useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { MedicalDegree, SpecializationSelect, SettingForm, SocialSettingInput, PasswordSettingInput, SettingInput } from "../TextFormSetting";
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";


function SettingBodyMid(props) {
    const medicalSpecializations = [
        'Anesthetics',
        'Breast Screening',
        'Cardiology',
        'Ear, nose and throat (ENT)',
        'Elderly services department',
        'Gastroenterology',
        'General Surgery',
        'Gynecology',
        'Hematology',
        'Neonatal Unit',
        'Neurology',
        'Nutrition and dietetics',
        'Obstetrics and gynecology units',
        'Oncology',
        'Ophthalmology',
        'Orthopedics',
        'Physiotherapy',
        'Renal Unit',
        'Sexual Health',
        'Urology'
    ]
    const [Password, setPassword] = useState(true);
    const toggleEditPassword = () => {
        setPassword(!Password);
    };

    const [Social, setSocial] = useState(true);
    const toggleEditSocial = () => {
        setSocial(!Social);
    };

    const [General, setGeneral] = useState(true);
    const toggleEditGeneral = () => {
        setGeneral(!General);
    };

    const [Educational, setEducational] = useState(true);
    const toggleEditEducational = () => {
        setEducational(!Educational);
    };

    const [Service, setService] = useState(true);
    const toggleEditService = () => {
        setService(!Service);
    };

    const [Department, setDepartment] = useState(true);
    const toggleEditDepartment = () => {
        setDepartment(!Department);
    };

    const [Emergency, setEmergency] = useState(true);
    const toggleEditEmergency = () => {
        setEmergency(!Emergency);
    };

    return (
        <>
            <DynamicCard name="SettingBodyMid">
                <SettingForm name="SettingForm_form" legend="Password Change" btn="Change Password" show={Password} TheEvent={toggleEditPassword}>
                    <span style={{
                        color: 'white',
                        position: 'absolute', right: '40px', top: '-15px',
                        fontSize: '1.3em',
                        borderRadius: '20px',
                        padding: '5px',
                        backgroundColor: '#272c34',
                        cursor: 'pointer',
                    }} onClick={toggleEditPassword}
                    ><MdModeEdit /></span>
                    <PasswordSettingInput name="old-password" label="Old Password:" disabled={Password} />
                    <PasswordSettingInput name="new-password" label="New Password:" disabled={Password} />
                    <PasswordSettingInput name="confirm-password" label="Confirm Password:" disabled={Password} />
                </SettingForm>


                <SettingForm name="SettingForm_form" legend="Social Media Links" btn="Save Change" show={Social} TheEvent={toggleEditSocial}>
                    <span style={{
                        color: 'white',
                        position: 'absolute', right: '40px', top: '-15px',
                        fontSize: '1.3em',
                        borderRadius: '20px',
                        padding: '5px',
                        backgroundColor: '#272c34',
                        cursor: 'pointer',
                    }} onClick={toggleEditSocial}
                    ><MdModeEdit /></span>
                    <SocialSettingInput name="facebook" label="Facebook:" icon={<AiFillFacebook />} placeholder="" disabled={Social} />
                    <SocialSettingInput name="twitter" label="Twitter:" icon={<AiOutlineX />} placeholder="" disabled={Social} />
                    <SocialSettingInput name="linkedin" label="Linkedin:" icon={<AiFillLinkedin />} placeholder="" disabled={Social} />
                    <SocialSettingInput name="instagram" label="Instagram:" icon={<AiFillInstagram />} placeholder="" disabled={Social} />
                    <SocialSettingInput name="whatsapp" label="WhatsApp:" icon={<AiOutlineWhatsApp />} placeholder="" disabled={Social} />
                </SettingForm>

                {props.userType === "Doctor" ? (
                    <>
                        <SettingForm name="SettingForm_form" legend="Profissioal Information" btn="Save Change" show={General} TheEvent={toggleEditGeneral}>
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
                            <MedicalDegree label='Academic Degree'
                                placeholder='Select your Academic Degree'
                                disabled={General} />
                            <SpecializationSelect
                                label='Specialization'
                                placeholder='Medical Specialization'
                                optionsList={medicalSpecializations}
                                name='medicalSpecialization'
                                disabled={General} />
                            <SettingInput class_name="SettingInput" type="number" name="Years of Experience" label="Experience:" placeholder="" disabled={General} />
                        </SettingForm>

                        <SettingForm name="SettingForm_form" legend="Educational Information" btn="Save Change" show={Educational} TheEvent={toggleEditEducational}>
                            <span style={{
                                color: 'white',
                                position: 'absolute', right: '40px', top: '-15px',
                                fontSize: '1.3em',
                                borderRadius: '20px',
                                padding: '5px',
                                backgroundColor: '#272c34',
                                cursor: 'pointer',
                            }} onClick={toggleEditEducational}
                            ><MdModeEdit /></span>
                            <SettingInput class_name="SettingInput" type="text" name="Medical School" label="Medical School:" placeholder="" disabled={Educational} />
                            <SettingInput class_name="SettingInput" type="text" name="Internships  " label="Internships  :" placeholder="" disabled={Educational} />
                            <SettingInput class_name="SettingInput" type="text" name="Residencies " label="Residencies :" placeholder="" disabled={Educational} />
                            <SettingInput class_name="SettingInput" type="text" name="Fellowships " label="Fellowships :" placeholder="" disabled={Educational} />
                        </SettingForm>
                    </>
                ) : null}

                {props.userType === "Laboratory" || props.userType === "Radiology" ? (
                    <>
                        <SettingForm name="SettingForm_form" legend="Service Provided" btn="Add Service" show={Service} TheEvent={toggleEditService}>
                            <span style={{
                                color: 'white',
                                position: 'absolute', right: '40px', top: '-15px',
                                fontSize: '1.3em',
                                borderRadius: '20px',
                                padding: '5px',
                                backgroundColor: '#272c34',
                                cursor: 'pointer',
                            }} onClick={toggleEditService}
                            ><MdModeEdit /></span>
                            <SettingInput class_name="SettingInput" type="text" name="Service Name" label="Service Name:" placeholder="" disabled={Service} />
                        </SettingForm>
                    </>
                ) : null}

                {props.userType === "Hospital" ? (
                    <>
                        <SettingForm name="SettingForm_form" legend="Department" btn="Add Department" show={Department} TheEvent={toggleEditDepartment}>
                            <span style={{
                                color: 'white',
                                position: 'absolute', right: '40px', top: '-15px',
                                fontSize: '1.3em',
                                borderRadius: '20px',
                                padding: '5px',
                                backgroundColor: '#272c34',
                                cursor: 'pointer',
                            }} onClick={toggleEditDepartment}
                            ><MdModeEdit /></span>
                            <SettingInput class_name="SettingInput" type="text" name="Department" label="Department:" placeholder="" disabled={Department} />
                        </SettingForm>

                        <SettingForm name="SettingForm_form" legend="Emergency Services" btn="Add Services" show={Emergency} TheEvent={toggleEditEmergency}>
                            <span style={{
                                color: 'white',
                                position: 'absolute', right: '40px', top: '-15px',
                                fontSize: '1.3em',
                                borderRadius: '20px',
                                padding: '5px',
                                backgroundColor: '#272c34',
                                cursor: 'pointer',
                            }} onClick={toggleEditEmergency}
                            ><MdModeEdit /></span>
                            <SettingInput class_name="SettingInput" type="text" name="Emergency Services" label="Services:" placeholder="" disabled={Emergency} />
                        </SettingForm>
                    </>
                ) : null}
            </DynamicCard>
        </>
    );

}
export default SettingBodyMid;