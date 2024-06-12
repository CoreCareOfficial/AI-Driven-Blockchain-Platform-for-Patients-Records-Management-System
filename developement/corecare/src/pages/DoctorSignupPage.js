import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { SelectInputField, SelectMultiInputField, TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import Upload from "../component/loginDetails/Upload";

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
    ]

    return (
        <CardLogin step={4}>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Welcome Dr. Mohammed Muthanna' />
                <FormLogin buttonName='Continue' path='/signup/password-step'>
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
                        label='Location of Work'
                        type='text'
                        name='locationOfWork'
                        placeholder='Enter your Location of work'
                        required={true}
                    />
                </FormLogin>
            </div>
        </CardLogin>
    );
};

export default DoctorSignupPage;