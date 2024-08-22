import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { DateInputField, GenderInputField, TextInputField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { userInfo } from '../Recoil/Atom';
import { useSetRecoilState } from 'recoil';
import '../component/bootcomponent/message.css';
import { Toast } from 'primereact/toast';

function SignupPage() {
    const toast = useRef(null);
    const [emailValue, setEmailValue] = useState('');
    const setUserInfo = useSetRecoilState(userInfo);
    setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        email: emailValue
    }));
    const handleOnBlur = async (v) => {
        const checkEmail = {
            email: v
        };
        try {
            const response = await fetch("https://corecare-server-qtw7.onrender.com/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkEmail)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Email doesn't Exist") {
                console.log(jsonData.message);

            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    email: emailValue
                }));
                setEmailValue('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    const navigate = useNavigate();

    return (
        <CardLogin step={1}>
            <Toast ref={toast} />
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Who are you?' />
                <FormLogin buttonName='Continue' onContinue={() => navigate('/signup/step-2')}>
                    <div className='row' style={{ marginTop: '-15px' }}>
                        <div className='col col-lg-6'>
                            <TextInputField
                                label='First Name *'
                                type='text'
                                name='firstName'
                                placeholder='Enter your first name'
                                required={true}
                            />
                        </div>
                        <div className='col col-lg-6'>
                            <TextInputField
                                label='Second Name'
                                type='text'
                                name='secondName'
                                placeholder='Enter your second name'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-lg-6'>
                            <TextInputField
                                label='Third Name'
                                type='text'
                                name='thirdName'
                                placeholder='Enter your third name'
                            />
                        </div>
                        <div className='col col-lg-6'>
                            <TextInputField
                                label='Last Name *'
                                type='text'
                                name='lastName'
                                placeholder='Enter your last name'
                                required={true}
                            />
                        </div>
                    </div>
                    <TextInputField
                        label='Email *'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        min={13}
                        required={true}
                        onBlur={handleOnBlur}
                    />
                    <DateInputField name='dateOfBirth' label='Date of Birth *' placeholder='Select your Birth date' />
                    <GenderInputField label='Sex' option1='Male' option2='Female' name='sex' />
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
            <Outlet />
        </CardLogin>
    );
};

export default SignupPage;