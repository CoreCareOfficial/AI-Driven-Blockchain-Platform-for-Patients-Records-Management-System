import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import '../fonts/caladea.css';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import Submit from '../component/loginDetails/Submit';
import { Link } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { HealthcareFacilityInfo, userInfo } from '../Recoil/Atom';
import { useEffect, useRef, useState } from 'react';

function EndSignupPage() {

    const hasEffectRun = useRef(false);

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

    const [errorMessage, setErrorMessage] = useState('');
    const userInfoValue = useRecoilValue(userInfo);
    const facilityInfoValue = useRecoilValue(HealthcareFacilityInfo);

    // console.log(Object.entries(userInfoValue));
    // console.log(Object.entries(facilityInfoValue));

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
            email = userInfoValue.email;
            password = userInfoValue.password;
            username = userInfoValue.userName;
            try {
                const response = await fetch("http://localhost:5000/patients", {
                    method: "POST",
                    body: formData
                });
                console.log("res = " + response);
                console.log('Added Patient Successful');
                if (type === "Doctor") {
                    console.log("type4: " + type);
                    const patientId = await response.json();
                    // const patientId = "PAT-14";
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
                        const doctorResponse = await fetch("http://localhost:5000/doctors", {
                            method: "POST",
                            body: doctorFormData
                        });
                        console.log("res = " + doctorResponse);
                        console.log('Added Doctor Successful');
                        successfulAddUser = true;
                    } catch (error) {
                        console.error(error.message);
                        setErrorMessage(error.message);
                        successfulAddUser = false;
                    }
                } else {
                    successfulAddUser = true;
                    console.log('else Patient Successful');
                    console.log(successfulAddUser);
                }
            } catch (error) {
                console.error(error.message);
                setErrorMessage(error.message);
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
                const userResponse = await fetch("http://localhost:5000/login/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage('Something error');
        }
    };

    // const resetState = useResetRecoilState(userInfo);
    // const resetStatefacility = useResetRecoilState(HealthcareFacilityInfo);
    useEffect(() => {
        if (!hasEffectRun.current) {
            successfulCreated();
            hasEffectRun.current = true;
            // resetState();
            // resetStatefacility();
        }
    }, []);


    return (
        <section style={{ alignContent: 'center', backgroundColor: '#181a1f' }}>
            <div className='' style={styleBody}>
                <p style={styleP}>Core-care</p>
                {!errorMessage ?
                    <><FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ffffff', width: '60px', height: '60px', margin: 'auto' }} />
                        <TitlePage title='Your account has been successfully created' />
                        <TextPage text='Please keep your private key and your password to log into your account and manage your health records.' />
                        <div style={{ width: '70%' }}><Link to='/login'><Submit name='Go to Login' /></Link></div>
                    </> :
                    <>
                        <TitlePage title='Your account has NOT been successfully created' />
                        <TextPage text={errorMessage} />
                        <div style={{ width: '70%' }}><Link to='/signup'><Submit name='Go to signup' /></Link></div>
                    </>
                }
            </div>
        </section>
    );
};

export default EndSignupPage;