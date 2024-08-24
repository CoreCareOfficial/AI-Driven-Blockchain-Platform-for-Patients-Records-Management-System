import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Toast } from 'primereact/toast';
import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { TextInputField, PasswordInputField } from '../component/loginDetails/TextInputField';
import ForgotButton from '../component/loginDetails/ForgotButton';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { loginInfo } from '../Recoil/Atom';
import '../component/bootcomponent/message.css';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function LoginPage() {
    const loginInfoValue = useRecoilValue(loginInfo);
    const toast = useRef(null);
    const navigate = useNavigate();
    const [p, setP] = useState('');

    const handleBlur = (pass) => {
        setP(pass);
    }
    const handleUsername = async () => {
        const loginData = {
            email: loginInfoValue.login,
            password: p,
        };

        try {
            const userResponse = await fetch(`${SERVER_URL}/login/get`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const jsonData = await userResponse.json();
            if (userResponse.ok) {
                // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successful' });
                navigate('/userprofile', { state: { userType: jsonData.userType === "Radiology Center" ? 'Radiology' : jsonData.userType } });
            } else {
                sessionStorage.clear();
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Password or Email' });
            }
        } catch (error) {
            sessionStorage.clear();
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Password or Email' });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <CardLogin>
                <div className="card-body d-flex flex-column justify-content-center" style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Login" />
                    <TextPage text="Fill out your personal details" />
                    <FormLogin buttonName="Login" onContinue={handleUsername}>
                        <TextInputField
                            label="Username, Email"
                            type="text"
                            placeholder="Enter your username or email"
                            required={true}
                            isLogin={true}
                            name="login"
                        />
                        <PasswordInputField label="Password" placeholder="Enter your password" onBlur={handleBlur} />
                    </FormLogin>
                    <ForgotButton />
                    <SignOrLogin goSign={true} />
                </div>
            </CardLogin>
            <Outlet />
        </>
    );
}

export default LoginPage;