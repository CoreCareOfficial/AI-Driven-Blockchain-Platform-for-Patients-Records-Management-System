import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { TextInputField, PasswordInputField } from '../component/loginDetails/TextInputField';
import ForgotButton from '../component/loginDetails/ForgotButton';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GeneralData, loginInfo } from '../Recoil/Atom';

function LoginPage() {

    const setloginInfo = useSetRecoilState(loginInfo);
    const loginInfoValue = useRecoilValue(loginInfo);
    const GeneralDataValue = useRecoilValue(GeneralData);

    const handleConfirmed = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hashedPassword= " + hashedPassword);
        return hashedPassword;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleUsername = () => {
        const p = GeneralDataValue.password;
        console.log('p= ' + p);
        const type = emailRegex.test(loginInfoValue.login) ? 'email' : 'userName';
        console.log("type= " + type);
        setloginInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [type]: loginInfoValue.login,
            password: handleConfirmed(p)
        }));
    }

    return (
        <>
            <CardLogin>
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Login" />
                    <TextPage text='Fill out your personal details' />
                    <FormLogin buttonName='Login' path='/userprofile' onContinue={handleUsername}>
                        <TextInputField
                            label='Username, Email'
                            type='text'
                            placeholder='Enter your username or email'
                            required={true}
                            isLogin={true}
                            name='login'
                        />
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
