import { useSetRecoilState } from "recoil";
import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";
import { GeneralData, loginInfo } from "../Recoil/Atom";
import { useNavigate } from "react-router-dom";


function ForgetPasswordPage() {
    const setUserInfo = useSetRecoilState(GeneralData);
    const setloginInfo = useSetRecoilState(loginInfo);
    setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        isForgetton: true
    }));

    const navigate = useNavigate();

    const handleBlur = (e) => {
        setloginInfo((prevUserInfo) => ({
            ...prevUserInfo,
            login: e
        }));
    };
    return (
        <>
            <CardLogin>
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Forget Password" />
                    <TextPage text='Fill out the required details' />
                    <FormLogin buttonName='Login' onContinue={navigate('/signup/verify-code')}>
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