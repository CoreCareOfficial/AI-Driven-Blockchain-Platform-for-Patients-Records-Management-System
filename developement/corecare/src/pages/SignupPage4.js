import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { PasswordInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { userInfo } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

function SignupPage4() {
    const userInfoValue = useRecoilValue(userInfo);

    return (
        <CardLogin step={5}>
            {userInfoValue.id &&
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text='Now set up your password , but make it storing' />
                    <FormLogin buttonName='Continue' path='/signup/verify-code'>
                        <PasswordInputField
                            label='Password'
                            placeholder='Enter your password'
                            name='password'
                        />
                        <PasswordInputField
                            label='Confirm Password'
                            placeholder='Enter your password again'
                            name='confirmedPassword'
                        />
                    </FormLogin>
                </div>
            }
        </CardLogin>
    );
};

export default SignupPage4;