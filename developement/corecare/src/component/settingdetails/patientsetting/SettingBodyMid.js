import React, { useRef, useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { MedicalDegree, SpecializationSelect, SettingForm, SocialSettingInput, PasswordSettingInput, SettingInput } from "../TextFormSetting";
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { updateUserInfo } from "../../../Recoil/UpdateData";
import { loginInfo } from "../../../Recoil/Atom";
import { Toast } from "primereact/toast";
import bcrypt from 'bcryptjs';


function SettingBodyMid(props) {
    const socialInfo = props.socialInfo ? props.socialInfo : [];
    const profissional = props.profissional ? props.profissional : {};
    const educational = props.educational ? props.educational : {};
    const departments = props.departments ? props.departments : [];
    const services = props.services ? props.services : [];

    const toast = useRef(null);

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
    const loginInfoValue = useRecoilValue(loginInfo);
    const updateUserInfoValue = useRecoilValue(updateUserInfo);
    const toggleEditPassword = async () => {

        if (updateUserInfoValue.newPassword !== updateUserInfoValue.confirmPassword) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Passwords do not match' });
            return;
        }
        if (updateUserInfoValue.newPassword.length < 6) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Password must be more than 5 digits' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updateUserInfoValue.newPassword, salt);
        console.log("hashedPassword= " + hashedPassword);

        const data = {
            emailorusername: loginInfoValue.login,
            password: updateUserInfoValue.password,
            newPassword: hashedPassword,
        };
        try {
            const response = await fetch("http://192.168.137.1:5000/login/change", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Password Updated Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated Password' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating password' });
        }
        setPassword(!Password);
    };

    const [Social, setSocial] = useState(true);
    const toggleEditSocial = async () => {
        const data = {
            fb: 'facebook',
            facebook: updateUserInfoValue.facebook,
            tw: 'twitter',
            twitter: updateUserInfoValue.twitter,
            li: 'linkedin',
            linkedin: updateUserInfoValue.linkedin,
            im: 'instagram',
            instagram: updateUserInfoValue.instagram,
            wh: 'whatsapp',
            whatsapp: updateUserInfoValue.whatsapp
        };
        try {
            const response = await fetch(`http://192.168.137.1:5000/socialmedia/${loginInfoValue.login}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Socailmedia accounts updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Socailmedia accounts updated successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating socialmedia' });
        }
        setSocial(!Social);
    };

    const [General, setGeneral] = useState(true);
    const toggleEditGeneral = async () => {
        if (!profissional.doctorid) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Doctor ID is required' });
            return;
        }
        const data = {
            specialization: updateUserInfoValue.specialization,
            academicdegree: updateUserInfoValue.academicDegree,
            yearsofexperience: updateUserInfoValue.yearsOfExperience,
            locationofwork: updateUserInfoValue.locationOfWork,
            clinicnumber: updateUserInfoValue.clinicNumber,
        };
        console.log('data:', data);
        try {
            const response = await fetch(`http://192.168.137.1:5000/doctors/updateprofissionalinfo/${profissional.doctorid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Proffesional Info Updated Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Proffesional Info Updated Successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating Proffisional info' });
        }
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
            <Toast ref={toast} />
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
                    }} onClick={() => setPassword(!Password)}
                    ><MdModeEdit /></span>
                    <PasswordSettingInput name="password" label="Old Password:" disabled={Password} />
                    <PasswordSettingInput name="newPassword" label="New Password:" disabled={Password} />
                    <PasswordSettingInput name="confirmPassword" label="Confirm Password:" disabled={Password} />
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
                    }} onClick={() => setSocial(!Social)}
                    ><MdModeEdit /></span>
                    <SocialSettingInput name="facebook" label="Facebook:" icon={<AiFillFacebook />} placeholder="" disabled={Social} value={socialInfo.find(sm => sm.type === 'facebook')?.link || ''} />
                    <SocialSettingInput name="twitter" label="Twitter:" icon={<AiOutlineX />} placeholder="" disabled={Social} value={socialInfo.find(sm => sm.type === 'twitter')?.link || ''} />
                    <SocialSettingInput name="linkedin" label="Linkedin:" icon={<AiFillLinkedin />} placeholder="" disabled={Social} value={socialInfo.find(sm => sm.type === 'linkedin')?.link || ''} />
                    <SocialSettingInput name="instagram" label="Instagram:" icon={<AiFillInstagram />} placeholder="" disabled={Social} value={socialInfo.find(sm => sm.type === 'instagram')?.link || ''} />
                    <SocialSettingInput name="whatsapp" label="WhatsApp:" icon={<AiOutlineWhatsApp />} placeholder="" disabled={Social} value={socialInfo.find(sm => sm.type === 'whatsapp')?.link || ''} />
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
                            }} onClick={() => setGeneral(!General)}
                            ><MdModeEdit /></span>
                            <MedicalDegree label='Academic Degree'
                                placeholder='Select your Academic Degree'
                                disabled={General}
                                value={profissional.academicdegree}
                            />
                            <SpecializationSelect
                                label='Specialization'
                                placeholder='Medical Specialization'
                                optionsList={medicalSpecializations}
                                name='specialization'
                                disabled={General}
                                value={profissional.specialization}
                            />
                            <SettingInput class_name="SettingInput" type="number" name="yearsOfExperience" label="Experience Years" placeholder="" disabled={General} value={profissional.yearsofexperience} />
                            <SettingInput class_name="SettingInput" type="text" name="clinicNumber" label="Clinic Number" placeholder="" disabled={General} value={profissional.clinicnumber} />
                            <SettingInput class_name="SettingInput" type="text" name="locationOfWork" label="Location of Work" placeholder="" disabled={General} value={profissional.locationofwork} />
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
                            <SettingInput class_name="SettingInput" type="text" name="Medical School" label="Medical School:" placeholder="" disabled={Educational} value={educational.medschool} />
                            <SettingInput class_name="SettingInput" type="text" name="Internships  " label="Internships  :" placeholder="" disabled={Educational} value={educational.internships} />
                            <SettingInput class_name="SettingInput" type="text" name="Residencies " label="Residencies :" placeholder="" disabled={Educational} value={educational.residencies} />
                            <SettingInput class_name="SettingInput" type="text" name="Fellowships " label="Fellowships :" placeholder="" disabled={Educational} value={educational.fellowships} />
                        </SettingForm>
                    </>
                ) : null}

                {props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Pharmacy" ? (
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
                        <SettingForm name="SettingForm_form" legend="Departments" btn="Add Department" show={Department} TheEvent={toggleEditDepartment}>
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
                            {
                                departments && departments.map((department, index) => (

                                    <SettingInput key={index} class_name="SettingInput" type="text" name="Department" label={`Department ${index + 1}:`} placeholder="" disabled={Department} value={department.name} />
                                ))
                            }
                            <SettingInput class_name="SettingInput" type="text" name="Department" label="New Department" placeholder="" disabled={Department} />
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
                            {
                                services && services.map((service, index) => (
                                    <SettingInput key={index} class_name="SettingInput" type="text" name="Emergency Services" label={`Service ${index + 1}:`} placeholder="" disabled={Emergency} value={service.name} />
                                ))
                            }
                            <SettingInput class_name="SettingInput" type="text" name="Emergency Services" label="New Service:" placeholder="" disabled={Emergency} />
                        </SettingForm>
                    </>
                ) : null}
            </DynamicCard>
        </>
    );

}
export default SettingBodyMid;