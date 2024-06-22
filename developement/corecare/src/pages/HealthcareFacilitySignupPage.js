import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { CountrySelectorField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";


function HealthcareFacilitySignupPage() {

    const userInfoValue = useRecoilValue(userInfo);
    const healthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const facilityType = userInfoValue.typeUser;

    const handleOnSubmit = async () => {
        const email = healthcareFacilityInfoValue.email;
        console.log('email : ' + email);
        // try {
        //     const response = await fetch(`http://localhost:5000/../${email}`);
        //     const jsonData = await response.json();
        //     console.log('jsonData: ' + jsonData);
        // } catch (error) {
        //     console.error(error.message);
        // }
    };
    return (
        <CardLogin step={1}>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text={`Fill out the ${facilityType} details`} />
                <FormLogin buttonName='Continue' path='/signup/HealthcareFacility-step-2' onContinue={handleOnSubmit}>
                    <TextInputField
                        label={`${facilityType} Name`}
                        type='text'
                        name='name'
                        placeholder={`Enter the ${facilityType} Name`}
                        required={true}
                        isFacility={true}
                    />
                    <CountrySelectorField name='country' isFacility={true} />
                    <TextInputField
                        label={`${facilityType} Phone Number`}
                        type='text'
                        name='phoneNumber'
                        placeholder={`Enter the ${facilityType} phone number`}
                        required={true}
                        isFacility={true}
                    />
                    <TextInputField
                        label={`${facilityType} Email`}
                        type='email'
                        name='email'
                        placeholder={`Enter the ${facilityType} email`}
                        required={true}
                        isFacility={true}
                    />
                </FormLogin>
            </div>
        </CardLogin>
    );
};

export default HealthcareFacilitySignupPage;