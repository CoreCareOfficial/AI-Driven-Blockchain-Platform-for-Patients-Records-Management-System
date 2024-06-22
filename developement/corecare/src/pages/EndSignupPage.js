import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import '../fonts/caladea.css';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import Submit from '../component/loginDetails/Submit';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { HealthcareFacilityInfo, userInfo } from '../Recoil/Atom';
import { useEffect, useState } from 'react';

function EndSignupPage() {

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
    // const resetState = useResetRecoilState(userInfo);
    // const resetStatefacility = useResetRecoilState(HealthcareFacilityInfo);

    console.log(Object.entries(userInfoValue));
    console.log(Object.entries(facilityInfoValue));
    // resetState();
    // resetStatefacility();

    const successfulCreated = async () => {
        const type = userInfoValue.typeUser;
        console.log(type);
        if (type === "Patient") {
            const formData = new FormData();
            formData.append('username', userInfoValue.userName);
            formData.append('firstName', userInfoValue.firstName);
            formData.append('secondName', userInfoValue.secondName);
            formData.append('thirdName', userInfoValue.thirdName);
            formData.append('lastName', userInfoValue.lastName);
            formData.append('email', userInfoValue.email);
            formData.append('password', userInfoValue.password);
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

            console.log('successful');
            try {
                const response = await fetch("http://localhost:5000/patients", {
                    method: "POST",
                    body: formData
                });
                console.log("res = " + response);
            } catch (error) {
                console.error(error.message);
                setErrorMessage(error.message)
            }
        }
    };

    useEffect(() => {
        successfulCreated();
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