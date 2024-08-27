import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { SelectInputField, TextInputField } from '../component/loginDetails/TextInputField';
import ImageSignup from '../component/loginDetails/ImageSignup';
import { useRef, useState } from 'react';
import Upload from '../component/loginDetails/Upload';
import { userInfo } from "../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const useOptimistic = (initialValue, callback) => {
    const [value, setValue] = useState(initialValue);

    const updateValue = async (newValue) => {
        const previousValue = value;
        setValue(newValue);
        try {
            await callback(newValue);
        } catch (error) {
            setValue(previousValue);
        }
    };

    return [value, updateValue];
};

function SignupPage3() {

    const [selectedNational, setSelectedNational] = useState(true);
    const [selectedPassport, setSelectedPassport] = useState(false);

    const setUserInfo = useSetRecoilState(userInfo);
    const userInfoValue = useRecoilValue(userInfo);
    const toast = useRef(null);

    const handleIdTypeChangeNational = (event) => {
        setSelectedNational(true);
        setSelectedPassport(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
        // alert(event.target.value);
    };
    const handleIdTypeChangePassport = (event) => {
        setSelectedPassport(true);
        setSelectedNational(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
        // alert(event.target.value);
    };

    const nextPage = userInfoValue.typeUser === "Doctor" ? '/signup/step-4' : '/signup/password-step';

    const styleIDType = {
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontFamily: 'DM Sans',
        fontWeight: 700,
        marginBottom: '16px'
    }
    const StyleInputChickbox = {
        marginRight: '6px',
        border: '2px solid #ffffff',
        outline: '1px solid #3146FF',
    }

    const bloodTypeslist = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const navigate = useNavigate();
    const text = userInfoValue.typeUser === "Doctor" ? `Welcome Dr. ${userInfoValue.firstName} ${userInfoValue.lastName}` :
        `Welcome ${userInfoValue.firstName} ${userInfoValue.lastName}`;


    const [userInfoOptimistic, setUserInfoOptimistic] = useOptimistic(userInfo, async (newUserInfoValue) => {
        const formData = new FormData();
        formData.append('id', newUserInfoValue.id);
        formData.append('image', newUserInfoValue.FIdCardPhoto ? newUserInfoValue.FIdCardPhoto : newUserInfoValue.passportPhoto);

        // Show the loading toast
        toast.current.show({ severity: 'info', summary: 'Processing', detail: 'Checking your ID card and ID, please wait...', life: 3000 });

        try {
            const response = await fetch(`${SERVER_URL}/ai/checkidentity`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                navigate(nextPage);
                // Optionally show a success toast
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'ID check successful' });
            } else {
                const errorData = await response.json();
                toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
                throw new Error(errorData.message || 'Invalid Data');
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    });

    const handleOnSubmit = async () => {
        if (!userInfoValue.id && (!userInfoValue.FIdCardPhoto || !userInfoValue.passportPhoto)) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID card photo or passport photo is required' });
            return;
        }

        try {
            await setUserInfoOptimistic(userInfoValue);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
        }
    };
    // const handleOnSubmit = async () => {
    //     if (!userInfoValue.id && (!userInfoValue.FIdCardPhoto || !userInfoValue.passportPhoto)) {
    //         toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID card photo or passport photo is required' });
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('id', userInfoValue.id);
    //     formData.append('image', userInfoValue.FIdCardPhoto ? userInfoValue.FIdCardPhoto : userInfoValue.passportPhoto);

    //     try {
    //         const response = await fetch(`${SERVER_URL}/checkidentity`, {
    //             method: "POST",
    //             body: formData
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //                 //             navigate(nextPage);
    //         } else {
    //             const errorData = await response.json(); // Parse the error response if any
    //             toast.current.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Invalid Data' });
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //         toast.current.show({ severity: 'error', summary: 'Error', detail: `Error occurred: ${error.message}` });
    //     }
    // };
    return (
        <CardLogin step={3}>
            <Toast ref={toast} />
            {userInfoValue.phoneNumber ?
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text={text} />
                    <FormLogin buttonName='Continue' onContinue={handleOnSubmit}>
                        <div className='row' style={{ padding: '0 10px' }}>
                            <div className='col col-lg-4' style={{ padding: '0px', alignItems: 'center' }}>
                                <ImageSignup />
                            </div>
                            <div className='col col-lg-8' style={{
                                paddingLeft: '10px', paddingRight: '0px', maxWidth: '100%'
                            }}>
                                <div style={styleIDType}>
                                    <div className="idType__title">ID Type:</div>
                                    <div className="idType__input">
                                        <input type="checkbox"
                                            name="idType"
                                            value="National"
                                            id="National"
                                            onChange={handleIdTypeChangeNational}
                                            checked={selectedNational}
                                            style={StyleInputChickbox}
                                        />
                                        <label htmlFor="national">National</label>
                                    </div>
                                    <div className="idType__input">
                                        <input type="checkbox"
                                            name="idType"
                                            value="Passport"
                                            id="passport"
                                            onChange={handleIdTypeChangePassport}
                                            checked={selectedPassport}
                                            style={StyleInputChickbox}
                                        />
                                        <label htmlFor="passport">Passport</label>
                                    </div>
                                </div>
                                {selectedNational
                                    ?
                                    <TextInputField
                                        label='National ID *'
                                        type='text'
                                        name='id'
                                        placeholder='Enter your national ID'
                                        required={true}
                                    />
                                    :
                                    <TextInputField
                                        label='Passport NO *'
                                        type='text'
                                        name='id'
                                        placeholder='Enter your passport ID'
                                        required={true}
                                    />
                                }
                                <div style={{ height: '6px' }} />
                                <SelectInputField
                                    label='Blood Type *'
                                    placeholder='Select your blood type...'
                                    optionsList={bloodTypeslist}
                                    required={true}
                                    name='bloodType'
                                />
                            </div>
                        </div>
                        <div className='row' style={{ padding: '0 10px' }}>
                            <div className='col col-lg-4' style={{ padding: '0px', textAlign: 'center' }}>
                                {!selectedNational &&
                                    <div style={{ maxWidth: '97%' }}>
                                        <TextInputField
                                            label='Passport Type *'
                                            type='text'
                                            name='passportType'
                                            placeholder='Enter your passsport type'
                                            required={true}
                                        />
                                    </div>
                                }
                            </div>
                            <div className='col col-lg-8' style={{ paddingLeft: '10px', paddingRight: '0px', maxWidth: '100%' }}>
                                {!selectedNational &&
                                    <TextInputField
                                        label='Passport Country Code *'
                                        type='text'
                                        name='passportCountryCode'
                                        placeholder='Enter passport country code'
                                        required={true}
                                    />
                                }
                            </div>
                        </div>
                        {selectedNational
                            ?
                            <div>
                                <Upload title="Upload the front of national ID card *" name='FIdCardPhoto' />
                                <Upload title="Upload the black of national ID card *" name='BIdCardPhoto' />
                            </div>
                            :
                            <Upload title="Upload passport document *" name='passportPhoto' />
                        }
                    </FormLogin>
                </div>
                :
                <div className='card-body d-flex flex-column justify-content-center' style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TextPage text="You should not bypass the pervious step" color='red' />
                </div>
            }
        </CardLogin>
    );
};

export default SignupPage3;

