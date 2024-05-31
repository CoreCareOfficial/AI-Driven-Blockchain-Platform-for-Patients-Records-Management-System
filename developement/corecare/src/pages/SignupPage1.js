import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { RadioField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';

function SignupPage1() {

    return (
        <CardLogin step={1}>
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <FormLogin buttonName='Continue' path='/signup/step-2'>
                    <div style={{ height: '200PX', padding: '20px', backgroundColor: '#3F4652', borderRadius: '25PX' }}>
                        <TextPage text='Sign up as' />
                        <div style={{ marginBottom: '12px' }}></div>
                        <RadioField label1='Patient' label2='Hospital' name='users' />
                        <RadioField label1='Doctor' label2='Laboratory' name='users' />
                        <RadioField label1='Researcher' label2='Pharmacy' name='users' />
                        <RadioField label1='X-ray Center' name='users' />
                    </div>
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
            <Outlet />
        </CardLogin>
    );
};

export default SignupPage1;