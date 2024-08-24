import { useRecoilValue } from "recoil";
import { userInfo } from "../Recoil/Atom";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { SelectInputField, SelectMultiInputField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import Upload from "../component/loginDetails/Upload";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";


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

function DoctorSignupPage() {

    const medicalSpecializations = [
        'Anesthetics',
        'Breast Screening',
        'Cardiology',
        'Ear, nose and throat (ENT)',
        'Elderly services department',
        'Gastroenterology',
        'General Surgery',
        'Gynecology',
        'Hematology',
        'Neonatal Unit',
        'Neurology',
        'Nutrition and dietetics',
        'Obstetrics and gynecology units',
        'Oncology',
        'Ophthalmology',
        'Orthopedics',
        'Physiotherapy',
        'Renal Unit',
        'Sexual Health',
        'Urology'
    ];
    const navigate = useNavigate();

    const userInfoValue = useRecoilValue(userInfo);
    const toast = useRef(null);

    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(userInfo, async (newUserInfoValue) => {
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
        if (!userInfoValue.licenseNumber && !userInfoValue.licenseDocument) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'License Document is required' });
            return;
        }

        try {
            await setUserInfoOptimistic(userInfoValue);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    };
    return (
        <CardLogin step={4}>
            <Toast ref={toast} />
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text={`Welcome Dr. ${userInfoValue.firstName} ${userInfoValue.lastName}`} />
                <FormLogin buttonName='Continue' onContinue={handleOnSubmit}>
                    <SelectInputField
                        label='Medical Specialization'
                        placeholder='Select your Medical Specialization...'
                        optionsList={medicalSpecializations}
                        required={true}
                        name='medicalSpecialization'
                    />
                    <SelectMultiInputField
                        label='Academic Degree'
                        placeholder='Select your Academic Degree'
                    />
                    <TextInputField
                        label='License Number'
                        type='text'
                        name='licenseNumber'
                        placeholder='Enter your License Number'
                        required={true}
                    />
                    <Upload title="Upload license document *" name='licenseDocument' />
                    <TextInputField
                        label='Location of Work *'
                        type='text'
                        name='locationOfWork'
                        placeholder='Enter your Location of work'

                    />
                </FormLogin>
            </div>
        </CardLogin>
    );
};

export default DoctorSignupPage;