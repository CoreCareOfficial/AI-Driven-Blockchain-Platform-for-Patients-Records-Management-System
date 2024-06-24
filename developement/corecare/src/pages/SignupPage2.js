import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { CountrySelectorField, GenderInputField, TextInputField } from '../component/loginDetails/TextInputField';
import { userInfo } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';

function SignupPage2() {

    const userInfoValue = useRecoilValue(userInfo);
    const navigate = useNavigate();
    return (
        <CardLogin step={2}>
            {userInfoValue.firstName ?
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text={`Welcome ${userInfoValue.firstName} ${userInfoValue.lastName}`} />
                    <FormLogin buttonName='Continue' onContinue={() => navigate('/signup/step-3')}>
                        <CountrySelectorField name='country' />
                        <TextInputField
                            label="Phone Number *"
                            type='text'
                            name='phoneNumber'
                            required={true}
                            placeholder="Enter your phone number"
                        />
                        <TextInputField
                            label="Job"
                            type='text'
                            name='job'
                            placeholder="Enter your job"
                        />
                        <TextInputField
                            label="Address *"
                            type='text'
                            name='address'
                            required={true}
                            placeholder="Enter your address (city-street)"
                        />
                        <GenderInputField label='Status' option1='Single' option2='Married' name='status' />
                    </FormLogin>
                </div>
                :
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TextPage text="You should not bypass the pervious step" color='red' />
                </div>
            }
        </CardLogin >
    );
};

export default SignupPage2;