import { useState } from "react";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { PasswordInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { GeneralData, HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import bcrypt from 'bcryptjs';

function SignupPage4() {
    const userInfoValue = useRecoilValue(userInfo);
    const userGeneralData = useRecoilValue(GeneralData);

    const isFacility =
        userInfoValue.typeUser === "Doctor" ? false :
            userInfoValue.typeUser === "Patient" ? false : true;

    const setUserInfo = useSetRecoilState(isFacility ? HealthcareFacilityInfo : userInfo);
    const HealthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const [nextPage, setNextPage] = useState('');

    const handleConfirmed = async (e) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userGeneralData.password, salt);
        console.log("hashedPassword= " + hashedPassword);
        if (userGeneralData.password.length >= 6) {
            if (userGeneralData.password === userGeneralData.confirmedPassword && !userGeneralData.isForgetton) {
                setNextPage('/signup/verify-code');
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    password: hashedPassword
                }));
            }
            else if (userGeneralData.password === userGeneralData.confirmedPassword && userGeneralData.isForgetton) {
                setNextPage('/signup/end_step');
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    password: hashedPassword
                }));
            } else
                alert('The two passwords are not the same')
        }
        else
            alert('The password must be 6 digits at lest')
    };

    const step =
        userInfoValue.typeUser === "Doctor" ? 5 :
            userInfoValue.typeUser === "Patient" ? 4 : 3;

    return (
        <CardLogin step={step}>
            {(userInfoValue.phoneNumber || HealthcareFacilityInfoValue.licenseNumber || userGeneralData.isForgetton) ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text='Now set up your password , but make it strong' />
                    <FormLogin buttonName='Continue' path={nextPage} onContinue={handleConfirmed}>
                        <PasswordInputField
                            label='Password *'
                            placeholder='Enter your password'
                            name='password'
                            isFacility={isFacility}
                        />
                        <PasswordInputField
                            label='Confirm Password *'
                            placeholder='Enter your password again'
                            name='confirmedPassword'
                            isFacility={isFacility}
                        />
                    </FormLogin>
                </div>
                :
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TextPage text="You should not bypass the pervious step" />
                </div>
            }
        </CardLogin>
    );
};

export default SignupPage4;