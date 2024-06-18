import { useRecoilValue } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import React, { useState, useRef } from 'react';
import { HealthcareFacilityInfo, userInfo } from "../Recoil/Atom";

function VerifyCodePage() {

    const userInfoValue = useRecoilValue(userInfo);
    const facilityInfoValue = useRecoilValue(HealthcareFacilityInfo);

    const email = userInfoValue.email ? userInfoValue.email
        : facilityInfoValue.email ? facilityInfoValue.email : '';

    const nextPage = userInfoValue.isForgetton ? '/signup/password-step' : '/signup/end_step';

    const [code, setCode] = useState(Array(4).fill(''));

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

    const styleInputCode = {
        width: '52px',
        height: '60px',
        borderRadius: '5PX',
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
            {email || userInfoValue.isForgetton ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Verify Code" />
                    <TextPage text={`Check your Email, we have sent you the code at ${email}`} />
                    <FormLogin buttonName='Continue' path={nextPage}>
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
                        <div style={{ color: '#ffffff', margin: '30px 0 60px 0', fontSize: '14px' }}>
                            Didn't receive the code?
                            <button style={{ color: '#3146FF', }}>Resend Code</button>
                        </div>
                    </FormLogin>
                </div>
                :
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TextPage text="You should not bypass the pervious step" />
                </div>
            }
        </CardLogin>
    );
};

export default VerifyCodePage;