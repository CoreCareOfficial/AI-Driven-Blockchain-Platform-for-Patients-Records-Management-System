import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { DateInputField, GenderInputField, TextInputField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import { Outlet } from 'react-router-dom';

function SignupPage() {
    const handleOnBlur = async (v) => {
        const checkEmail = {
            email: v
        };
        try {
            const response = await fetch("http://localhost:5000/login", {
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
                alert(jsonData.message);

            }
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <CardLogin step={1}>
            <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Who are you?' />
                <FormLogin buttonName='Continue' path='/signup/step-2' >
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