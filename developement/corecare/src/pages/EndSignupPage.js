import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import '../fonts/caladea.css';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import Submit from '../component/loginDetails/Submit';
import { Link } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { HealthcareFacilityInfo, userInfo } from '../Recoil/Atom';
import { useState } from 'react';

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
        // paddingTop: '5px'
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
            const info = {
                username: userInfoValue.userName,
                firstName: userInfoValue.firstName,
                secondName: userInfoValue.secondName,
                thirdName: userInfoValue.thirdName,
                lastName: userInfoValue.lastName,
                email: userInfoValue.email,
                password: userInfoValue.password,
                dateOfBirth: userInfoValue.dateOfBirth,
                country: userInfoValue.country,
                sex: userInfoValue.sex,
                phoneNumber: userInfoValue.phoneNumber,
                status: userInfoValue.status,
                address: userInfoValue.address,
                job: userInfoValue.job,
                personalPhoto: userInfoValue.photo,
                idType: userInfoValue.idType,
                nationalID: userInfoValue.idType === "National" ? userInfoValue.id : '',
                passportNo: userInfoValue.idType !== "National" ? userInfoValue.id : '',
                FIDCardPhoto: userInfoValue.FIdCardPhoto,
                BIDCardPhoto: userInfoValue.BIdCardPhoto,
                passportType: userInfoValue.passportType,
                passportCountryCode: userInfoValue.passportCountryCode,
                passportDocument: userInfoValue.passportPhoto,
                PublicWalletAddress: userInfoValue.PublicWalletAddress,
            };
            console.log('successful');
            try {
                const body = info;
                const response = await fetch("http://localhost:5000/patients", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("res = " + response);
            } catch (error) {
                setErrorMessage(error.message)
                console.error(error.message);
                return false;
            }
            return true;
        }
        return false;
    };
    return (
        <section style={{ alignContent: 'center', backgroundColor: '#181a1f' }}>
            <div className='' style={styleBody}>
                <p style={styleP}>Core-care</p>
                {successfulCreated() ?
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