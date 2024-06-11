import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../Recoil/Atom';
import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { RadioField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';

function SignupPage1() {
    const setUserInfo = useSetRecoilState(userInfo);
    const [selectedType, setSelectedType] = useState('Patient');
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        const stepsN =
            selectedType === "Patient" ? 4
                : selectedType === "Doctor" ? 5
                    : selectedType === "Hospital" ? 3
                        : selectedType === "X-ray Center" ? 3
                            : selectedType === "Laboratory" ? 3
                                : selectedType === "Pharmacy" ? 3
                                    : selectedType === "Researcher" ? 0 : 0;
        setSteps(stepsN);
    }, [selectedType]);

    const handleChangeUserType = (e) => {
        setSelectedType(e.target.value);
    };

    const handleContinue = () => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            typeUser: selectedType,
            steps: steps
        }));
    }

    const nextPage =
        selectedType === "Patient" ? '/signup/step-1'
            : selectedType === "Doctor" ? '/signup/step-1'
                : selectedType === "Hospital" ? '/signup/HealthcareFacility-step-1'
                    : selectedType === "X-ray Center" ? '/signup/HealthcareFacility-step-1'
                        : selectedType === "Laboratory" ? '/signup/HealthcareFacility-step-1'
                            : selectedType === "Pharmacy" ? '/signup/HealthcareFacility-step-1'
                                : selectedType === "Researcher" ? '' : '';

    return (
        <CardLogin>
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <FormLogin buttonName='Continue' onContinue={handleContinue} path={nextPage}>
                    <div style={{ height: '200px', padding: '20px', backgroundColor: '#3F4652', borderRadius: '25px' }}>
                        <TextPage text='Sign up as' />
                        <div style={{ marginBottom: '12px' }}></div>
                        <RadioField label1='Patient' label2='Hospital' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='Doctor' label2='Laboratory' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='Researcher' label2='Pharmacy' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                        <RadioField label1='X-ray Center' name='users' onSelected={handleChangeUserType} selectedTypeValue={selectedType} />
                    </div>
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
            <Outlet />
        </CardLogin>
    );
}

export default SignupPage1;
