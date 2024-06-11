import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { userInfo } from "../Recoil/Atom";


function HealthcareFacilitySignupPage() {

    const userInfoValue = useRecoilValue(userInfo);
    const facilityType = userInfoValue.typeUser;

    return (
        <CardLogin step={1}>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text={`Fill out the ${facilityType} details`} />
                <FormLogin buttonName='Continue' path='/signup/HealthcareFacility-step-2'>
                    <TextInputField label={`${facilityType} Name`} placeholder={`Enter the ${facilityType} Name`} required={true} />
                    <TextInputField label={`${facilityType} Address`} placeholder={`Enter the ${facilityType} address`} required={true} />
                    <TextInputField label={`${facilityType} Phone Number`} placeholder={`Enter the ${facilityType} phone number`} required={true} />
                    <TextInputField label={`${facilityType} Email`} placeholder={`Enter the ${facilityType} email`} required={true} />
                </FormLogin>
            </div>
        </CardLogin>
    );
};

export default HealthcareFacilitySignupPage;