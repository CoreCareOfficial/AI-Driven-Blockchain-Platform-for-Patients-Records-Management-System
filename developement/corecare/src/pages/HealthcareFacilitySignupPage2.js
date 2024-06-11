import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { GenderInputField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import Upload from "../component/loginDetails/Upload";
import { userInfo } from "../Recoil/Atom";


function HealthcareFacilitySignupPage2() {
    const userInfoValue = useRecoilValue(userInfo);
    const facilityType = userInfoValue.typeUser;


    return (
        <CardLogin step={2}>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text={`Fill out the ${facilityType} details`} />
                <FormLogin buttonName='Continue' path='/signup/password-step'>
                    <TextInputField label={`${facilityType} License Number`} placeholder={`Enter the ${facilityType} license number`} required={true} />
                    <Upload title="Upload the license document *" />
                    <GenderInputField label={`${facilityType} Type`} option1='Government' option2='Private' />
                </FormLogin>
            </div>
        </CardLogin>
    );

};

export default HealthcareFacilitySignupPage2;