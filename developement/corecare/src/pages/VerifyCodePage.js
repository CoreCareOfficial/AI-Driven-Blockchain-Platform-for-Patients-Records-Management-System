import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import React, { useState, useRef, useEffect } from 'react';
import { GeneralData, HealthcareFacilityInfo, loginInfo, userInfo } from "../Recoil/Atom";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

function VerifyCodePage() {

    const hasEffectRun = useRef(false);
    const toast = useRef(null);

    const userInfoValue = useRecoilValue(userInfo);
    const GeneralDataValue = useRecoilValue(GeneralData);
    const loginInfoValue = useRecoilValue(loginInfo);
    const facilityInfoValue = useRecoilValue(HealthcareFacilityInfo);
    const navigate = useNavigate();

    const email = userInfoValue.email ? userInfoValue.email
        : facilityInfoValue.email ? facilityInfoValue.email : loginInfoValue.email;

    const [username, domain] = email.split('@');
    const obfuscatedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);

    const nextPage = GeneralDataValue.isForgetton ? '/signup/password-step' : '/signup/end_step';

    const [code, setCode] = useState(Array(4).fill(''));
    const [message, setMessage] = useState('');

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(0, 1); // Limit input to 1 character
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        if (index < 3 && value.length === 1) {
            if (index === 0) {
                input2Ref.current.focus();
            } else if (index === 1) {
                input3Ref.current.focus();
            } else if (index === 2) {
                input4Ref.current.focus();
            }
        }
    };

    const handleSendCode = async () => {
        console.log('email: ' + email);
        try {
            const response = await fetch("https://corecare-server.onrender.com:5000/verification", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            if (response.ok) {
                setMessage('Verification code sent to your email');
                return toast.current.show({ severity: 'success', summary: 'Success', detail: 'Verification code sent to your email' });

            } else {
                const errorData = await response.text();
                setMessage(`Failed to send verification code: ${errorData}`);
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed to send verification code: ${errorData}` });
            }
        } catch (error) {
            setMessage(`An error occurred while sending the code: ${error.message}`);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `An error occurred while sending the code: ${error.message}` });
        }
    };

    const handleVerifyCode = async () => {
        const verificationCode = code.join('');
        try {
            const response = await fetch("https://corecare-server.onrender.com:5000/verification/verify-code", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verificationCode })
            });
            if (response.ok) {
                console.log('go to next page');
                navigate(nextPage);
            } else {
                const errorData = await response.text();
                setMessage(`Invalid verification code: ${errorData}`);
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Invalid verification code: ${errorData}` });
            }
        } catch (error) {
            setMessage(`An error occurred while verifying the code: ${error.message}`);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `An error occurred while verifying the code: ${error.message}` });
        }
    };

    useEffect(() => {
        if (!hasEffectRun.current) {
            handleSendCode();
            hasEffectRun.current = true;
        }
    }, []);

    const styleInputCode = {
        width: '52px',
        height: '60px',
        borderRadius: '5px',
        margin: '10px',
        fontSize: '32px',
        textAlign: 'center',
        color: '#3146FF',
    }

    const step =
        userInfoValue.typeUser === "Doctor" ? 6 :
            userInfoValue.typeUser === "Patient" ? 5 : 4;

    return (
        <CardLogin step={step}>
            <Toast ref={toast} />
            {email || GeneralDataValue.isForgetton ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Verify Code" />
                    <TextPage text={`Check your Email, we have sent you the code at ${`${obfuscatedUsername}@${domain}`}`} />
                    <FormLogin buttonName='Continue' onContinue={handleVerifyCode}>
                        <div style={{ minWidth: '248px', marginTop: '20px' }}>
                            <input style={styleInputCode}
                                type="text"
                                maxLength={1}
                                ref={input1Ref}
                                onChange={(e) => handleInputChange(e, 0)}
                                value={code[0]} />
                            <input style={styleInputCode}
                                type="text"
                                maxLength={1}
                                ref={input2Ref}
                                onChange={(e) => handleInputChange(e, 1)}
                                value={code[1]} />
                            <input style={styleInputCode}
                                type="text"
                                maxLength={1}
                                ref={input3Ref}
                                onChange={(e) => handleInputChange(e, 2)}
                                value={code[2]} />
                            <input style={styleInputCode}
                                type="text"
                                maxLength={1}
                                ref={input4Ref}
                                onChange={(e) => handleInputChange(e, 3)}
                                value={code[3]} />
                        </div>
                        {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}
                        <div style={{ color: '#ffffff', margin: '30px 0 60px 0', fontSize: '14px' }}>
                            Didn't receive the code?
                            <button style={{ color: '#3146FF', }} onClick={handleSendCode}>Resend Code</button>
                        </div>
                    </FormLogin>
                </div>
                :
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TextPage text="You should not bypass the previous step" color='red' />
                </div>
            }
        </CardLogin>
    );
};

export default VerifyCodePage;
