import CardLogin from "../component/bootcomponent/CardLogin";
import FormLogin from "../component/loginDetails/FormLogin";
import { TextInputField } from "../component/loginDetails/TextInputField";
import TextPage from "../component/loginDetails/TextPage";
import TitlePage from "../component/loginDetails/TitlePage";


function ForgetPasswordPage() {
    return (
        <>
            <CardLogin>
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-100px' }}>
                    <TitlePage title="Forget Password" />
                    <TextPage text='Fill out the required details' />
                    <FormLogin buttonName='Login' path='/signup/verify-code'>
                        <TextInputField
                            label='Username, Email'
                            type='text'
                            placeholder='Enter your username or email'
                            required={true}
                            name='userName'
                        />
                        <TextInputField
                            label='National ID, Passport No'
                            type='text'
                            placeholder='Enter your national ID or passport No'
                            required={true}
                            name='id'
                        />
                    </FormLogin>
                </div>
            </CardLogin>
        </>
    );
};

export default ForgetPasswordPage;