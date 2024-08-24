import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { GenderInputField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import Upload from "../component/loginDetails/Upload";
import { HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useOptimistic = (initialValue, callback) => {
    const [value, setValue] = useState(initialValue);

    const updateValue = async (newValue) => {
        const previousValue = value;
        setValue(newValue);
        try {
            await callback(newValue);
        } catch (error) {
            setValue(previousValue);
        }
    };

    return [value, updateValue];
};

function HealthcareFacilitySignupPage2() {
    const userInfoValue = useRecoilValue(userInfo);
    const HealthcareFacilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const toast = useRef(null);

    const facilityType = userInfoValue.typeUser;
    const navigate = useNavigate();

    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(HealthcareFacilityInfo, async (newUserInfoValue) => {
        const formData = new FormData();
        formData.append('id', newUserInfoValue.licenseNumber);
        formData.append('image', newUserInfoValue.licenseDocument);


        // Show the loading toast
        toast.current.show({ severity: 'info', summary: 'Processing', detail: 'Checking your license Document and license Number, please wait...', life: 5000 });

        try {
            const response = await fetch(`${SERVER_URL}/ai/checklicense`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/signup/password-step');
                // Optionally show a success toast
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'License Number check successful' });
            } else {
                const errorData = await response.json();
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
                throw new Error(errorData.message || 'Invalid Data');
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    });

    const handleOnSubmit = async () => {
        if (!HealthcareFacilityInfoValue.licenseNumber && !HealthcareFacilityInfoValue.licenseDocument) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'License Document is required' });
            return;
        }

        try {
            await setUserInfoOptimistic(HealthcareFacilityInfoValue);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    };

    return (
        <CardLogin step={2}>
            <Toast ref={toast} />
            {HealthcareFacilityInfoValue.name ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text={`Fill out the ${facilityType} details`} />
                    <FormLogin buttonName='Continue' onContinue={handleOnSubmit}>
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
                    <TextPage text="You should not bypass the pervious step" color='red' />
                </div>
            }
        </CardLogin>
    );

};

export default HealthcareFacilitySignupPage2;