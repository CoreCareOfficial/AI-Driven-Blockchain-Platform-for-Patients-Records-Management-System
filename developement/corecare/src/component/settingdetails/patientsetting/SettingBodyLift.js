import React, { useEffect, useRef, useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { Card } from "react-bootstrap";
import { SettingForm, SettingInput, SettingSelect, SettingCountry, UpdateImage } from "../TextFormSetting";
import { MdModeEdit } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateUserInfo } from "../../../Recoil/UpdateData";
import { Toast } from "primereact/toast";
import { loginInfo } from "../../../Recoil/Atom";
import ConfirmedDialog from "../../../utiles/ConfirmedDialog";

function SettingBodyLift(props) {
    const toast = useRef(null);
    const setUpdateValue = useSetRecoilState(updateUserInfo);
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
            dateofbirth: "0000-01-01",
            status: "",
            bloodtype: "",
            personalphoto: null,
            patientid: ""
        },
        healthInfo = { weight: "", height: "" },
        allergies = { allergyname: "" },
        practice = {
            practicelocation: "",
            affiliations: "",
            practicehours: "",
            languagesspoken: ""
        },
        healthcareProviderInfo = {
            id: "",
            username: "",
            name: "",
            phonenumber: "",
            address: "",
            country: "",
            email: "",
            facilityphoto: null,
        },
        doctorid = ''
    } = props;

    console.log('userInfo', userInfo);
    console.log('healthInfo', healthInfo);
    console.log('allergies', allergies);
    console.log('healthcareProviderInfo', healthcareProviderInfo);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        console.log('date', `${day}-${month}-${year}`);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setUpdateValue(prevUserInfo => {
            const newUserInfo = {
                personalphoto: userInfo.personalphoto || healthcareProviderInfo.facilityphoto || null,
                username: userInfo.username || healthcareProviderInfo.username || '',
                fullname: props.userType === "Patient" || props.userType === "Doctor"
                    ? `${userInfo.firstname} ${userInfo.secondname} ${userInfo.thirdname} ${userInfo.lastname}`
                    : healthcareProviderInfo.name,
                phonenumber: props.userType === "Patient" || props.userType === "Doctor"
                    ? userInfo.phonenumber : healthcareProviderInfo.phonenumber,
                country: props.userType === "Patient" || props.userType === "Doctor"
                    ? userInfo.country : healthcareProviderInfo.country,
                address: props.userType === "Patient" || props.userType === "Doctor"
                    ? userInfo.address : healthcareProviderInfo.address,
                job: userInfo.job,
                sex: userInfo.sex,
                dateofbirth: formatDate(userInfo.dateofbirth),
                status: userInfo.status,
                bloodtype: userInfo.bloodtype,
                patientid: userInfo.patientid,
                weight: healthInfo.weight,
                height: healthInfo.height,
                allergies: allergies.allergyname,
                practicelocation: practice.practicelocation,
                affiliations: practice.affiliations,
                practicehours: practice.practicehours,
                languagesspoken: practice.languagesspoken,
            };

            // Check if there are any changes
            if (JSON.stringify(prevUserInfo) !== JSON.stringify(newUserInfo)) {
                return newUserInfo;
            }
            return prevUserInfo;
        });
    }, [userInfo, healthcareProviderInfo, props.userType, setUpdateValue, allergies, healthInfo, practice]);


    const [General, setGeneral] = useState(true);
    const [isConfirm, setIsConfirm] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [handle, setHandle] = useState(null);

    const handleConfirm = () => {
        setIsConfirm(!isConfirm);
    };

    function splitFullName(fullName) {
        const nameParts = fullName.trim().split(/\s+/); // Split by whitespace

        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
        let secondName = "";
        let thirdName = "";
        let restOfName = "";

        if (nameParts.length > 2) {
            secondName = nameParts[1];
        }
        if (nameParts.length > 3) {
            thirdName = nameParts[2];
        }
        if (nameParts.length > 4) {
            restOfName = nameParts.slice(3, nameParts.length - 1).join(" ");
        }

        return {
            firstName: firstName,
            secondName: secondName,
            thirdName: `${thirdName} ${restOfName}`.trim(),
            lastName: lastName,
        };
    }

    const updateUserInfoValue = useRecoilValue(updateUserInfo);
    const updateGeneralInfo = async () => {
        const { firstName, secondName, thirdName, lastName } = splitFullName(updateUserInfoValue.fullname);
        const data = {
            address: updateUserInfoValue.address,
            country: updateUserInfoValue.country,
            dateofbirth: updateUserInfoValue.dateofbirth,
            firstname: firstName,
            phonenumber: updateUserInfoValue.phonenumber,
            job: updateUserInfoValue.job,
            lastname: lastName,
            secondname: secondName,
            sex: updateUserInfoValue.sex,
            status: updateUserInfoValue.status,
            thirdname: thirdName,
        };
        try {
            const response = await fetch(`https://corecare-server.onrender.com/patients/general/${userInfo.patientid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Patient updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
                setIsConfirm(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setIsConfirm(false);
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating general info' });
            setIsConfirm(false);
        }
        console.log("new info of patient:", updateUserInfoValue);
    }
    const toggleEditGeneral = async () => {
        setIsConfirm(!isConfirm);
        setTitle('Update General Information');
        setMessage('Are You Sure You Want To Update General Information?');
        setHandle(() => updateGeneralInfo);
        setGeneral(!General);
    };

    const loginInfoValue = useRecoilValue(loginInfo);

    const updateGeneralInfoFacility = async () => {
        const data = {
            address: updateUserInfoValue.address,
            country: updateUserInfoValue.country,
            phonenumber: updateUserInfoValue.phonenumber,
            name: updateUserInfoValue.name,
        };
        try {
            const response = await fetch(`https://corecare-server.onrender.com/healthcareproviders/updatehealthcareprovider/${loginInfoValue.login}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Healthcare Provider Updated Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
                setIsConfirm(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setIsConfirm(false);
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating general info' });
            setIsConfirm(false);
        }
        console.log("new info of patient:", updateUserInfoValue);
    }
    const toggleEditGeneralFacility = async () => {
        setIsConfirm(!isConfirm);
        setTitle('Update General Information');
        setMessage('Are You Sure You Want To Update General Information?');
        setHandle(() => updateGeneralInfoFacility);
        setGeneral(!General);
    };

    const [Health, setHealth] = useState(true);
    const updateHealthInfo = async () => {
        const data = {
            bloodtype: updateUserInfoValue.bloodtype,
            weight: updateUserInfoValue.weight,
            height: updateUserInfoValue.height,
            allergies: updateUserInfoValue.allergies
        };
        try {
            const response = await fetch(`https://corecare-server.onrender.com/patients/healthinfo/${userInfo.patientid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Patient updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
                setIsConfirm(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setIsConfirm(false);
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating health info' });
            setIsConfirm(false);
        }
    }
    const toggleEditHealth = async () => {
        setIsConfirm(!isConfirm);
        setTitle('Update Health Information');
        setMessage('Are You Sure You Want To Update Health Information?');
        setHandle(() => updateHealthInfo);
        setHealth(!Health);
    };

    const [Practice, setPractice] = useState(true);
    const updatePracticeInfo = async () => {
        const data = {
            practicelocation: updateUserInfoValue.practicelocation,
            affiliations: updateUserInfoValue.affiliations,
            practicehours: updateUserInfoValue.practicehours,
            languagesspoken: updateUserInfoValue.languagesspoken
        };
        console.log(doctorid);
        if (doctorid === '') {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Doctor not found' });
            return;
        }
        try {
            const response = await fetch(`https://corecare-server.onrender.com/doctors/updatepracticeinfo/${doctorid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Updated Practice Info Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
                setIsConfirm(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setIsConfirm(false);
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating practice info' });
            console.error(error.message);
            setIsConfirm(false);
        }
    }
    const toggleEditPractice = async () => {
        setIsConfirm(!isConfirm);
        setTitle('Update Practice Information');
        setMessage('Are You Sure You Want To Update Practice Information?');
        setHandle(() => updatePracticeInfo);
        setPractice(!Practice);
    };

    return (
        <>
            <Toast ref={toast} />
            <DynamicCard name="SettingBodyLift">
                <UpdateImage
                    img={userInfo.personalphoto ? userInfo.personalphoto : healthcareProviderInfo.facilityphoto ? healthcareProviderInfo.facilityphoto : null}
                    username={userInfo.username ? userInfo.username : healthcareProviderInfo.username ? healthcareProviderInfo.username : ''}
                    userType={props.userType}
                />
                <Card.Title style={{
                    textAlign: 'center',
                    color: "white",
                    fontSize: '1.5em',
                    marginTop: '5px',
                }}>{`${userInfo.username ? userInfo.username : healthcareProviderInfo.username ? healthcareProviderInfo.username : null}`}</Card.Title>

                <SettingForm name="SettingForm_form" legend="General Information" btn="Save Change" show={General} TheEvent={props.userType === "Patient" || props.userType === "Doctor" ? toggleEditGeneral : toggleEditGeneralFacility}>
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
                    <SettingInput
                        class_name="SettingInput"
                        type="text"
                        name={props.userType === "Patient" || props.userType === "Doctor" ? 'fullname' : 'name'}
                        label={props.userType === "Patient" || props.userType === "Doctor" ? 'Full Name' : 'Name'}
                        placeholder=""
                        disabled={General}
                        value={props.userType === "Patient" || props.userType === "Doctor" ? `${userInfo.firstname} ${userInfo.secondname} ${userInfo.thirdname} ${userInfo.lastname}` : healthcareProviderInfo.name}
                    />
                    <SettingInput
                        class_name="SettingInput"
                        type="text"
                        name="phonenumber"
                        label="Phone Number:"
                        placeholder=""
                        disabled={General}
                        value={props.userType === "Patient" || props.userType === "Doctor" ? userInfo.phonenumber : healthcareProviderInfo.phonenumber}
                    />
                    <SettingCountry label="Country:" name="country" disabled={General} value={props.userType === "Patient" || props.userType === "Doctor" ? userInfo.country : healthcareProviderInfo.country} />
                    <SettingInput class_name="SettingInput" type="text" name="address" label="Address:" placeholder="" disabled={General} value={props.userType === "Patient" || props.userType === "Doctor" ? userInfo.address : healthcareProviderInfo.address} />
                    {props.userType !== "Hospital" && props.userType !== "Radiology" && props.userType !== "Laboratory" && props.userType !== "Pharmacy" ? (
                        <>
                            <SettingInput class_name="SettingInput" type="text" name="job" label="Job:" placeholder="" disabled={General} value={userInfo.job} />
                            <SettingSelect items={['Male', 'Female']} label="Sex:" name="sex" disabled={General} value={userInfo.sex} />
                            <SettingInput class_name="SettingInput" type="date" name="dateofbirth" label="Date Of Birth:" placeholder="" disabled={General} value={formatDate(userInfo.dateofbirth)} />
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
                        }} onClick={() => setHealth(!Health)}
                        ><MdModeEdit /></span>
                        <SettingSelect items={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} name="bloodtype" label="Blood Type:" disabled={Health} value={userInfo.bloodtype} />
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
                        }} onClick={() => setPractice(!Practice)}
                        ><MdModeEdit /></span>
                        <SettingInput class_name="SettingInput" type="text" name="practicelocation" label="Location:" placeholder="" disabled={Practice} value={practice.practicelocation} />
                        <SettingInput class_name="SettingInput" type="text" name="affiliations" label="Affiliation:" placeholder="" disabled={Practice} value={practice.affiliations} />
                        <SettingInput class_name="SettingInput" type="number" name="practicehours" label="Hours:" placeholder="" disabled={Practice} value={practice.practicehours} />
                        <SettingInput class_name="SettingInput" type="text" name="languagesspoken" label="Language:" placeholder="" disabled={Practice} value={practice.languagesspoken} />
                    </SettingForm>
                ) : null}

            </DynamicCard>
            <ConfirmedDialog show={isConfirm} handleClose={handleConfirm} message={message} handleOk={handle} title={title} />
        </>
    );
}

export default SettingBodyLift;
