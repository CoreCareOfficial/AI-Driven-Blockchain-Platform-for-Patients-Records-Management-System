import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import '../fonts/caladea.css';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import Submit from '../component/loginDetails/Submit';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { GeneralData, HealthcareFacilityInfo, loginInfo, userInfo } from '../Recoil/Atom';
import { useEffect, useRef, useState } from 'react';

function EndSignupPage() {

    const hasEffectRun = useRef(false);
    const toast = useRef(null);

    const styleBody = {
        width: '34%',
        minWidth: '320px',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '30px'
    }
    const styleP = {
        color: 'white',
        fontFamily: 'Caladea',
        fontWeight: 700,
    };

    const [state, setState] = useState({
        errorMessage: '',
        successful: false,
    });

    const userInfoValue = useRecoilValue(userInfo);
    const facilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const userGeneralData = useRecoilValue(GeneralData);
    const userloginInfo = useRecoilValue(loginInfo);

    const successfulChangePassword = async () => {
        const email = userloginInfo.login;
        const newPassword = userloginInfo.password;
        console.log('new password of forget: ' + newPassword);
        const loginData = {
            email: email,
            newPassword: newPassword,
        };

        try {
            const userResponse = await fetch("https://corecare-server.onrender.com:5000/login/forget", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (userResponse.ok) {
                console.log("Password Updated Successfully");
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Password Updated Successfully' });
                setState((prevState) => ({ ...prevState, successful: true }));
            } else {
                console.log("Password has NOT Updated");
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Password has NOT Updated' });
                setState((prevState) => ({ ...prevState, errorMessage: "Password has NOT Updated", successful: false }));
            }

        } catch (error) {
            setState((prevState) => ({ ...prevState, errorMessage: error.message, successful: false }));
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    }

    const successfulCreated = async () => {
        const type = userInfoValue.typeUser;
        let email = '';
        let password = '';
        let username = '';
        let successfulAddUser = false;
        console.log("type1: " + type);
        if (type === "Patient" || type === "Doctor") {
            console.log("type2: " + type);
            console.log("hashedPassword 4 atom= " + userInfoValue.password);
            const formData = new FormData();
            formData.append('username', userInfoValue.userName);
            formData.append('firstName', userInfoValue.firstName);
            formData.append('secondName', userInfoValue.secondName);
            formData.append('thirdName', userInfoValue.thirdName);
            formData.append('lastName', userInfoValue.lastName);
            formData.append('email', userInfoValue.email);
            formData.append('password', userInfoValue.password);
            formData.append('dateOfBirth', userInfoValue.dateOfBirth);
            formData.append('country', userInfoValue.country.label);
            formData.append('sex', userInfoValue.sex);
            formData.append('phoneNumber', userInfoValue.phoneNumber);
            formData.append('status', userInfoValue.status);
            formData.append('address', userInfoValue.address);
            formData.append('job', type === 'Doctor' ? 'Doctor' : userInfoValue.job);
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
            password = userInfoValue.password;
            username = userInfoValue.userName;
            try {
                const response = await fetch("https://corecare-server.onrender.com:5000/patients", {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    console.log("res = " + response);
                    console.log('Added Patient Successful');
                    if (type === "Doctor") {
                        console.log("type4: " + type);
                        const patientId = await response.json();
                        console.log('patientId : ' + patientId);
                        const doctorFormData = new FormData();
                        doctorFormData.append('username', userInfoValue.userName);
                        doctorFormData.append('patientID', patientId);
                        doctorFormData.append('specialization', userInfoValue.medicalSpecialization);
                        doctorFormData.append('academicDegree', userInfoValue.academicDegree);
                        doctorFormData.append('locationOfWork', userInfoValue.locationOfWork);
                        doctorFormData.append('licenseNumber', userInfoValue.licenseNumber);
                        doctorFormData.append('licenseDocument', userInfoValue.licenseDocument);
                        try {
                            const doctorResponse = await fetch("https://corecare-server.onrender.com:5000/doctors", {
                                method: "POST",
                                body: doctorFormData
                            });
                            if (doctorResponse.ok) {
                                console.log("res = " + doctorResponse);
                                console.log('Added Doctor Successful');
                                successfulAddUser = true;
                            } else {
                                successfulAddUser = false;
                                toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding ${type}` });
                            }
                        } catch (error) {
                            console.error(error.message);
                            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                            setState((prevState) => ({ ...prevState, errorMessage: error.message, successful: false }));
                            successfulAddUser = false;
                        }
                    } else {
                        successfulAddUser = true;
                        console.log('else Patient Successful');
                        console.log(successfulAddUser);
                    }
                } else {
                    successfulAddUser = false;
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding ${type}` });
                }
            } catch (error) {
                console.error(error.message);
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                setState((prevState) => ({ ...prevState, errorMessage: error.message, successful: false }));
                successfulAddUser = false;
            }
        } else {
            const idFacility =
                type === "Hospital" ? 1
                    : type === "Radiology Center" ? 2
                        : type === "Laboratory" ? 3
                            : type === "Pharmacy" ? 4 : 5;

            const formData = new FormData();
            formData.append('username', facilityInfoValue.userName);
            formData.append('type', type);
            formData.append('name', facilityInfoValue.name);
            formData.append('phoneNumber', facilityInfoValue.phoneNumber);
            formData.append('email', facilityInfoValue.email);
            formData.append('country', facilityInfoValue.country.label);
            formData.append('address', facilityInfoValue.address);
            formData.append('licenseNumber', facilityInfoValue.licenseNumber);
            formData.append('PublicWalletAddress', facilityInfoValue.PublicWalletAddress);
            formData.append('facility_id', idFacility);
            formData.append('facilityPhoto', facilityInfoValue.facilityPhoto);
            formData.append('licenseDocument', facilityInfoValue.licenseDocument);

            email = facilityInfoValue.email;
            password = facilityInfoValue.password;
            username = facilityInfoValue.userName;
            try {
                const response = await fetch("https://corecare-server.onrender.com:5000/healthcareproviders", {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    console.log("res = " + response);
                    console.log(`Added ${type} Successful`);
                    successfulAddUser = true;
                } else {
                    successfulAddUser = false;
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding ${type}` });
                }
            } catch (error) {
                console.error(error.message);
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                setState((prevState) => ({ ...prevState, errorMessage: error.message, successful: false }));
                successfulAddUser = false;
            }
        }
        if (successfulAddUser && email && password && username) {
            console.log("type3: " + type);
            const loginData = {
                email: email,
                password: password,
                userType: userInfoValue.typeUser,
                username: username
            };

            try {
                const userResponse = await fetch("https://corecare-server.onrender.com:5000/login/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                if (userResponse.ok) {
                    console.log("User Added Successful");
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
                    setState((prevState) => ({ ...prevState, successful: true }));
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'User could not be added' });
                    setState((prevState) => ({ ...prevState, errorMessage: 'User could not be added', successful: false }));
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                setState((prevState) => ({ ...prevState, errorMessage: error.message, successful: false }));
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something error' });
            setState((prevState) => ({ ...prevState, errorMessage: 'Something error', successful: false }));
        }
    };

    useEffect(() => {
        if (!hasEffectRun.current) {
            userGeneralData.isForgetton ?
                successfulChangePassword() :
                successfulCreated();
            hasEffectRun.current = true;
        }
    }, []);


    return (
        <section style={{ alignContent: 'center', backgroundColor: '#181a1f' }}>
            <Toast ref={toast} />
            <div className='' style={styleBody}>
                <p style={styleP}>Core-care</p>
                {state.successful ?
                    <><FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ffffff', width: '60px', height: '60px', margin: 'auto' }} />
                        <TitlePage title={userGeneralData.isForgetton ? 'Your Password has been successfully updated' : 'Your Account has been successfully created'} />
                        <TextPage text='Please keep your Email and your password to log into your account and manage your health records.' />
                        <div style={{ width: '70%' }}><Link to='/login'><Submit name='Go to Login' /></Link></div>
                    </> :
                    <><FontAwesomeIcon icon={faCircleExclamation} style={{ color: 'red', width: '60px', height: '60px', margin: 'auto' }} />
                        <TitlePage title={userGeneralData.isForgetton ? 'Your Password has NOT been successfully updated' : 'Your Account has NOT been successfully created'} />
                        <TextPage text={state.errorMessage} color='red' />
                        <div style={{ width: '70%' }}><Link to='/signup'><Submit name='Go to signup' /></Link></div>
                    </>
                }
            </div>
        </section>
    );
};

export default EndSignupPage;
