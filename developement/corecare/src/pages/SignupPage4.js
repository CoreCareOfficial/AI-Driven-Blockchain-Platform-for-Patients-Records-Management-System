import { useState } from "react";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { PasswordInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

function SignupPage4() {
    const userInfoValue = useRecoilValue(userInfo);
    const HealthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const [nextPage, setNextPage] = useState('');

    const handleConfirmed = () => {
        if (userInfoValue.password === userInfoValue.confirmedPassword && !userInfoValue.isForgetton)
            setNextPage('/signup/verify-code');
        else if (userInfoValue.password === userInfoValue.confirmedPassword && userInfoValue.isForgetton)
            setNextPage('/signup/end_step');
        else
            alert('The two passwords are not the same')
    };

    const step =
        userInfoValue.typeUser === "Doctor" ? 5 :
            userInfoValue.typeUser === "Patient" ? 4 : 3;

    const isFacility =
        userInfoValue.typeUser === "Doctor" ? false :
            userInfoValue.typeUser === "Patient" ? false : true;

    return (
        <CardLogin step={step}>
            {(userInfoValue.phoneNumber || HealthcareFacilityInfoValue.licenseNumber || userInfoValue.isForgetton) ?
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