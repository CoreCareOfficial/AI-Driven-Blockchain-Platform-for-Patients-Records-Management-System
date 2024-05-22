import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import SignOrLogin from "../component/loginDetails/SignOrLogin";
import { PasswordInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";

function SignupPage4() {
    return (
        <CardLogin step={5} backPath='/signup/step-4'>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Now set up your password , but make it storing' />
                <FormLogin buttonName='Continue' path='/signup/verify-code'>
                    <PasswordInputField label='Password' placeholder='Enter your password' />
                    <PasswordInputField label='Confirm Password' placeholder='Enter your password again' />
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
        </CardLogin>
    );
};

export default SignupPage4;