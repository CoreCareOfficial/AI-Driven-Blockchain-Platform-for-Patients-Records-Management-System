import { useSetRecoilState } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { GeneralData, loginInfo } from "../Recoil/Atom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "primereact/toast";


function ForgetPasswordPage() {
    const toast = useRef(null);
    const setUserInfo = useSetRecoilState(GeneralData);
    const setloginInfo = useSetRecoilState(loginInfo);
    setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        isForgetton: true
    }));

    const navigate = useNavigate();

    const chickEmail = async (v) => {
        const checkEmail = {
            email: v
        };
        try {
            const response = await fetch("http://localhost:5000/login/checkemail", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkEmail)
            });

            const data = await response.json();
            console.log(data);
            if (data.message === "Account doesn't Exists") {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Email' });
            }
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Correct Email' });
                navigate('/signup/verify-code');
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid Email' });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
        }
    };

    const handleBlur = (e) => {
        setloginInfo((prevUserInfo) => ({
            ...prevUserInfo,
            login: e
        }));
        chickEmail(e);
    };
    return (
        <>
            <CardLogin>
                <Toast ref={toast} />
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Forget Password" />
                    <TextPage text='Fill out the required details' />
                    <FormLogin buttonName='continue'>
                        <TextInputField
                            label='Email'
                            type='text'
                            placeholder='Enter your username or email'
                            required={true}
                            name='email'
                            onBlur={handleBlur}
                        />
                    </FormLogin>
                </div>
            </CardLogin>
        </>
    );
};

export default ForgetPasswordPage;