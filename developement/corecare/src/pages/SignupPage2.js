import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { CountrySelectorField, GenderInputField, TextInputField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';


function SignupPage2() {

    return (
        <CardLogin step={3} backPath='/signup/step-2'>
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Welcome Mohammed Muthanna' />
                <FormLogin buttonName='Continue' path='/signup/step-4'>
                    <CountrySelectorField />
                    <TextInputField label="Phone Number" placeholder="Enter your phone number" />
                    <TextInputField label="Job" placeholder="Enter your job" />
                    <TextInputField label="Address" placeholder="   Enter your address (city-street)" />
                    <GenderInputField label='Status' option1='Single' option2='Married' />
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
        </CardLogin>
    );
};

export default SignupPage2;