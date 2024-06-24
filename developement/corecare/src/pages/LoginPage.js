import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { TextInputField, PasswordInputField } from '../component/loginDetails/TextInputField';
import ForgotButton from '../component/loginDetails/ForgotButton';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GeneralData, loginInfo } from '../Recoil/Atom';

function LoginPage() {

    const loginInfoValue = useRecoilValue(loginInfo);
    const GeneralDataValue = useRecoilValue(GeneralData);

    const handleUsername = async () => {
        const p = GeneralDataValue.password;
        console.log('p= ' + p);
        console.log(` emailorusername: ${loginInfoValue.login}`);
        const loginData = {
            email: loginInfoValue.login,
            password: p
        };

        try {
            const userResponse = await fetch("http://localhost:5000/login/get", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (userResponse.ok) {
                const jsonData = userResponse.json();
                console.log('login : ');
                console.log(jsonData);
                console.log("successful signin");
            } else {
                console.log("faild signin");
            }
        } catch (error) {
            console.log(error.message);
        }
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
