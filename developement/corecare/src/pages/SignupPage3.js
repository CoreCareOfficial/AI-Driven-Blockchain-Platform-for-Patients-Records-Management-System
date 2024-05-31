import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { SelectInputField, TextInputField } from '../component/loginDetails/TextInputField';
import ImageSignup from '../component/loginDetails/ImageSignup';
import { useState } from 'react';
import Upload from '../component/loginDetails/Upload';
import { userInfo } from "../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";


function SignupPage3() {

    const [selectedNational, setSelectedNational] = useState(true);
    const [selectedPassport, setSelectedPassport] = useState(false);

    const setUserInfo = useSetRecoilState(userInfo);
    const userInfoValue = useRecoilValue(userInfo);


    const handleIdTypeChangeNational = (event) => {
        setSelectedNational(true);
        setSelectedPassport(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
        // alert('selectedNational');
    };
    const handleIdTypeChangePassport = (event) => {
        setSelectedPassport(true);
        setSelectedNational(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'idType': event.target.value
        }));
        // alert('selectedPassport');
    };

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

    return (
        <CardLogin step={4}>
            {userInfoValue.phoneNumber &&
                <div className='card-body d-flex flex-column justify-content-center'
                    style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                    <TitlePage title="Sign Up" />
                    <TextPage text={`Welcome ${userInfoValue.firstName} ${userInfoValue.lastName}`} />
                    <FormLogin buttonName='Continue' path='/signup/step-5'>
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
                                            value="passport"
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
                                        label='National ID'
                                        type='text'
                                        name='id'
                                        placeholder='Enter your national ID'
                                        required={true}
                                    />
                                    :
                                    <TextInputField
                                        label='Passport NO'
                                        type='text'
                                        name='id'
                                        placeholder='Enter your passport ID'
                                        required={true}
                                    />
                                }
                                <div style={{ height: '6px' }} />
                                <SelectInputField
                                    label='Blood Type'
                                    placeholder='Select your blood type...'
                                    optionsList={bloodTypeslist}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className='row' style={{ padding: '0 10px' }}>
                            <div className='col col-lg-4' style={{ padding: '0px', textAlign: 'center' }}>
                                {!selectedNational &&
                                    <div style={{ maxWidth: '97%' }}>
                                        <TextInputField
                                            label='Passport Type'
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
                                        label='Passport Country Code'
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
                                <Upload title="Upload the front of national ID card" />
                                <Upload title="Upload the black of national ID card" />
                            </div>
                            :
                            <Upload title="Upload passport document" />
                        }
                    </FormLogin>
                </div>
            }
        </CardLogin>
    );
};

export default SignupPage3;

