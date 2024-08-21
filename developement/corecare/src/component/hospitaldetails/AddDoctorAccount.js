import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountCheckbox, AddAccountCountry, AddAccountForm, AddAccountInput, AddAccountInput2, AddAccountMedicalDegree, AddAccountPassport, AddAccountSelect, AddAccountSpecialization } from "../settingdetails/TextFormSetting";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ImageSignup from "../loginDetails/ImageSignup";
import { userInfo } from "../../Recoil/Atom";
import { Toast } from "primereact/toast";

function AddDoctorAccount(props) {
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
    ];

    const h_1 = {
        color: '#fff',
        fontSize: '1.5em',
        fontWeight: '600',
        margin: '10px 0px 30px 0px',
        textAlign: 'center',
    }

    function PageTitle(props) {
        const title = props.title.substring(4);
        return title;
    };

    const [selectedNational, setSelectedNational] = useState(true);
    const [selectedPassport, setSelectedPassport] = useState(false);
    const setUserInfo = useSetRecoilState(userInfo);
    const userInfoValue = useRecoilValue(userInfo);

    const handleIdTypeChangeNational = (event) => {
        setSelectedNational(true);
        setSelectedPassport(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
    };

    const handleIdTypeChangePassport = (event) => {
        setSelectedPassport(true);
        setSelectedNational(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
    };

    const toast = useRef(null);
    const [emailValue, setEmailValue] = useState('');

    const handleOnBlur = async (v, setV) => {
        const checkEmail = {
            email: v
        };
        try {
            const response = await fetch("http://127.0.0.1:4000/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkEmail)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Email doesn't Exist") {
                console.log(jsonData.message);

            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    email: emailValue
                }));
                setV('');
                setEmailValue('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleOnSubmit = async () => {
        console.log(userInfoValue);
        const username = userInfoValue.email.split('@')[0].toLocaleLowerCase().slice(0, 2) +
            userInfoValue.firstName.toLocaleLowerCase().slice(-2) +
            userInfoValue.lastName.toLocaleLowerCase()[0] +
            userInfoValue.phoneNumber.slice(-3);
        console.log('username = ' + username);
        let email = '';
        let password = '';
        let successfulAddUser = false;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstName', userInfoValue.firstName);
        formData.append('secondName', userInfoValue.secondName);
        formData.append('thirdName', userInfoValue.thirdName);
        formData.append('lastName', userInfoValue.lastName);
        formData.append('email', userInfoValue.email);
        formData.append('dateOfBirth', userInfoValue.dateOfBirth);
        formData.append('country', userInfoValue.country);
        formData.append('sex', userInfoValue.sex);
        formData.append('phoneNumber', userInfoValue.phoneNumber);
        formData.append('status', userInfoValue.status);
        formData.append('address', userInfoValue.address);
        formData.append('job', userInfoValue.job);
        formData.append('personalPhoto', userInfoValue.photo);
        formData.append('idType', userInfoValue.idType);
        formData.append('nationalID', userInfoValue.idType === "National" ? userInfoValue.id : '');
        formData.append('passportNo', userInfoValue.idType !== "National" ? userInfoValue.id : '');
        formData.append('FIDCardPhoto', userInfoValue.FIdCardPhoto);
        formData.append('BIDCardPhoto', userInfoValue.BIdCardPhoto);
        formData.append('passportType', userInfoValue.passportType);
        formData.append('passportCountryCode', userInfoValue.passportCountryCode);
        formData.append('passportDocument', userInfoValue.passportPhoto);
        formData.append('PublicWalletAddress', userInfoValue.PublicWalletAddress);
        formData.append('bloodType', userInfoValue.bloodType);
        email = userInfoValue.email;
        // password = userInfoValue.password;
        try {
            const response = await fetch("http://127.0.0.1:4000/patients/addpatient", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                console.log("res = " + response);
                console.log('Added Patient Successful');
                const { patientID, hashedPassword } = await response.json();
                password = hashedPassword;
                console.log('patientId : ' + patientID);
                const doctorFormData = new FormData();
                doctorFormData.append('username', username);
                doctorFormData.append('patientID', patientID);
                doctorFormData.append('specialization', userInfoValue.medicalSpecialization);
                doctorFormData.append('academicDegree', userInfoValue.academicDegree);
                doctorFormData.append('locationOfWork', userInfoValue.locationOfWork);
                doctorFormData.append('licenseNumber', userInfoValue.licenseNumber);
                doctorFormData.append('licenseDocument', userInfoValue.licenseDocument);
                try {
                    const doctorResponse = await fetch("http://127.0.0.1:4000/doctors", {
                        method: "POST",
                        body: doctorFormData
                    });
                    if (doctorResponse.ok) {
                        console.log("res = " + doctorResponse);
                        // toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
                        successfulAddUser = true;
                    } else {
                        successfulAddUser = false;
                        toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding Doctor` });
                    }
                } catch (error) {
                    console.error(error.message);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                    successfulAddUser = false;
                }
            } else {
                successfulAddUser = false;
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding Doctor` });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            successfulAddUser = false;
        }
        if (successfulAddUser && email && password && username) {
            console.log("save in login");
            const loginData = {
                email: email,
                password: password,
                userType: 'Doctor',
                username: username
            };

            try {
                const userResponse = await fetch("http://127.0.0.1:4000/login/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                if (userResponse.ok) {
                    console.log("User Added Successful");
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'User could not be added' });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something error' });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Container>
                <AddAccountForm label="Add Doctor" onSubmit={handleOnSubmit}>
                    <h1 style={h_1}>Create {PageTitle(props)} Account</h1>
                    {/* <UpdateImage img={userInfo.personalphoto} /> */}
                    <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <>
                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                                <AddAccountInput label='First Name: *' name='firstName' value="" type="text" required={true} placeholder="" />
                                <AddAccountInput label="Second Name:" name="secondName" value="" type="text" placeholder="" />
                                <AddAccountInput label="Third Name:" name="thirdName" value="" type="text" placeholder="" />
                                <AddAccountInput label="Last Name: *" name="lastName" value="" type="text" required={true} placeholder="" />
                                <AddAccountInput label="Email: *" name="email" value="" type="email" min={13} required={true} placeholder="" onBlur={handleOnBlur} />
                                <AddAccountInput label="Phone Number: *" name="phoneNumber" value="" type="text" required={true} placeholder="" />
                                <AddAccountInput label="Address: *" name="address" value="" type="text" required={true} placeholder="" />
                                <AddAccountInput label="Job:" name="job" value="" type="text" placeholder="" />
                            </div>

                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                                <AddAccountInput label="Date of Birth: *" name="dateOfBirth" value="" type="date" required={true} placeholder="" />
                                <AddAccountSelect items={['Male', 'Female']} label="Sex:" name="sex" value='' />
                                <AddAccountSelect items={['Single', 'Married']} label="Status:" name="status" value='' />
                                <AddAccountCountry label="Country:" name="country" required={true} value='' />
                                <AddAccountSelect items={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                                    required={true} label="Blood Type:"
                                    name="bloodType" value='' />
                                <AddAccountSpecialization label='Specialization:'
                                    optionsList={medicalSpecializations}
                                    name='medicalSpecialization' />
                                <AddAccountMedicalDegree label='Academic Degree:' />
                                <AddAccountInput label="Location of Work:" name='locationOfWork' value="" type="text" placeholder="" required={true} />

                            </div>

                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>

                                <div className='row' style={{ padding: '0 10px' }}>
                                    <div className='col col-lg-4' style={{ padding: '0px', alignItems: 'center' }}>
                                        <ImageSignup />
                                    </div>
                                    <div className='col col-lg-8'>
                                        <AddAccountCheckbox label="ID Type:" ch1="National " ch2="Passport "
                                            onChange1={handleIdTypeChangeNational}
                                            value1="National"
                                            value2="Passport"
                                            checked1={selectedNational}
                                            onChange2={handleIdTypeChangePassport}
                                            checked2={selectedPassport}
                                        />
                                        {selectedPassport ? (
                                            <AddAccountInput2 label="Passport ID:" name="id" value="" type="text" required={true} placeholder="" />
                                        ) :
                                            <AddAccountInput2 label="National ID:" name="id" value="" type="text" required={true} placeholder="" />
                                        }
                                    </div>
                                </div>


                                {selectedPassport ? (
                                    <>
                                        <AddAccountInput label="Passport Type: *" name="passportType" value="" type="text" required={true} placeholder="" />
                                        <AddAccountInput label="Passport Code: *" name="passportCountryCode" value="" type="text" required={true} placeholder="" />
                                        <AddAccountPassport title="Upload passport document *" name='passportPhoto' />
                                    </>
                                ) :
                                    <>
                                        <AddAccountPassport title="Upload front of national ID card *" name='FIdCardPhoto' />
                                        <AddAccountPassport title="Upload back of national ID card *" name='BIdCardPhoto' />
                                    </>
                                }

                                <AddAccountInput label="License Number: *" name='licenseNumber' value="" type="number" required={true} placeholder="" />
                                <AddAccountPassport title="Upload License document *" name='licenseDocument' />
                            </div>
                        </>
                    </div>
                </AddAccountForm>

            </Container >
        </>
    );
}
export default AddDoctorAccount;