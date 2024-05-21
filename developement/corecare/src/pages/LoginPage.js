import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { TextInputField, PasswordInputField } from '../component/loginDetails/TextInputField';
import ForgotButton from '../component/loginDetails/ForgotButton';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';

function LoginPage() {

    return (
        <>
            <CardLogin backPath=''>
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Login" />
                    <TextPage text='Fill out your personal details' />
                    <FormLogin buttonName='Login' path='/userprofile'>
                        <TextInputField label='Username, Email' placeholder='Enter your username or email' />
                        <PasswordInputField label='Password' placeholder="Enter your password" />
                    </FormLogin>
                    <ForgotButton />
                    <SignOrLogin goSign={true} />
                </div>
            </CardLogin>
            <Outlet />
        </>
    );
};

export default LoginPage;
