import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { GenderInputField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import Upload from "../component/loginDetails/Upload";
import { HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";


function HealthcareFacilitySignupPage2() {
    const userInfoValue = useRecoilValue(userInfo);
    const HealthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);

    const facilityType = userInfoValue.typeUser;


    return (
        <CardLogin step={2}>
            {HealthcareFacilityInfoValue.name ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text={`Fill out the ${facilityType} details`} />
                    <FormLogin buttonName='Continue' path='/signup/password-step'>
                        <TextInputField
                            label={`${facilityType} Address`}
                            type='text'
                            name='address'
                            placeholder={`Enter the ${facilityType} address`}
                            required={true}
                            isFacility={true}
                        />
                        <TextInputField
                            label={`${facilityType} License Number`}
                            type='text'
                            name='licenseNumber'
                            placeholder={`Enter the ${facilityType} license number`}
                            required={true}
                            isFacility={true}
                        />
                        <Upload title="Upload the license document *" name='licenseDocument' isFacility={true} />
                        <GenderInputField label={`${facilityType} Type`} option1='Government' option2='Private' isFacility={true} name='type' />
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

export default HealthcareFacilitySignupPage2;