import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { PasswordInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { GeneralData, HealthcareFacilityInfo, loginInfo, userInfo } from "../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "primereact/toast";


function SignupPage4() {
    const toast = useRef(null);

    const userInfoValue = useRecoilValue(userInfo);
    const userGeneralData = useRecoilValue(GeneralData);

    const isFacility =
        userInfoValue.typeUser === "Doctor" ||
            userInfoValue.typeUser === "Patient" ? false : true;

    const setUserInfo = useSetRecoilState(isFacility ? HealthcareFacilityInfo : userInfo);
    const setloginInfo = useSetRecoilState(loginInfo);
    const HealthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);

    const un = !isFacility ?
        userInfoValue.email.split('@')[0].toLocaleLowerCase().slice(0, 2) +
        userInfoValue.firstName.toLocaleLowerCase().slice(-2) +
        userInfoValue.lastName.toLocaleLowerCase()[0] +
        userInfoValue.phoneNumber.slice(-3)
        :
        HealthcareFacilityInfoValue.email.split('@')[0].toLocaleLowerCase().slice(0, 2) +
        HealthcareFacilityInfoValue.name.toLocaleLowerCase().slice(-2) +
        HealthcareFacilityInfoValue.phoneNumber.slice(-3) +
        HealthcareFacilityInfoValue.licenseNumber.slice(-2);

    const navigate = useNavigate();

    const handleConfirmed = async (e) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userGeneralData.password, salt);
        if (userGeneralData.password.length >= 6) {
            if (userGeneralData.password === userGeneralData.confirmedPassword && !userGeneralData.isForgetton) {
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    password: hashedPassword,
                    userName: un
                }));
                navigate('/signup/verify-code');
            }
            else if (userGeneralData.password === userGeneralData.confirmedPassword && userGeneralData.isForgetton) {
                setloginInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    password: hashedPassword
                }));
                navigate('/signup/end_step');
            } else
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'The two passwords are not the same' });

        }
        else
            alert('The password must be 6 digits at lest')
    };

    const step =
        userInfoValue.typeUser === "Doctor" ? 5 :
            userInfoValue.typeUser === "Patient" ? 4 : 3;

    return (
        <CardLogin step={step}>
            <Toast ref={toast} />
            {((userInfoValue.phoneNumber && userInfoValue.id && (userInfoValue.FIdCardPhoto || userInfoValue.passportPhoto)) || (HealthcareFacilityInfoValue.licenseNumber && HealthcareFacilityInfoValue.licenseDocument) || userGeneralData.isForgetton) ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text='Now set up your password , but make it strong' />
                    <FormLogin buttonName='Continue' onContinue={handleConfirmed}>
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
                    <TextPage text="You should not bypass the pervious step" color='red' />
                </div>
            }
        </CardLogin>
    );
};

export default SignupPage4;