import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { DateInputField, GenderInputField, TextInputField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';

function SignupPage() {


    return (
        <CardLogin step={2} backPath='/signup/step-1'>
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Who are you?' />
                <FormLogin buttonName='Continue' path='/signup/step-3'>
                    <div className='row' style={{ marginTop: '-15px' }}>
                        <div className='col col-lg-6'><TextInputField label='First Name' placeholder='Enter your first name' required={true} /></div>
                        <div className='col col-lg-6'><TextInputField label='Second Name' placeholder='Enter your second name' /></div>
                    </div>
                    <div className='row'>
                        <div className='col col-lg-6'><TextInputField label='Third Name' placeholder='Enter your third name' /></div>
                        <div className='col col-lg-6'><TextInputField label='Last Name' placeholder='Enter your last name' required={true} /></div>
                    </div>
                    <TextInputField label='Email' placeholder='Enter your email' required={true} />
                    <DateInputField label='Date of Birth' placeholder='Select your Birth date' />
                    <GenderInputField label='Gender' option1='Male' option2='Female' />
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
            <Outlet />
        </CardLogin>
    );
};

export default SignupPage;