import CardLogin from '../component/bootcomponent/CardLogin';
import TitlePage from '../component/loginDetails/TitlePage';
import TextPage from '../component/loginDetails/TextPage';
import FormLogin from '../component/loginDetails/FormLogin';
import { SelectInputField, TextInputField } from '../component/loginDetails/TextInputField';
import SignOrLogin from '../component/loginDetails/SignOrLogin';
import ImageSignup from '../component/loginDetails/ImageSignup';
import { useState } from 'react';
import Upload from '../component/loginDetails/Upload';


function SignupPage3() {

    const [selectedNational, setSelectedNational] = useState(true);
    const [selectedPassport, setSelectedPassport] = useState(false);

    const handleIdTypeChangeNational = (event) => {
        setSelectedNational(true);
        setSelectedPassport(false);
        // alert('selectedNational');
    };
    const handleIdTypeChangePassport = (event) => {
        setSelectedPassport(true);
        setSelectedNational(false);
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


    return (
        <CardLogin step={4} backPath='/signup/step-3'>
            <div className='card-body d-flex flex-column justify-content-center'
                style={{ width: '100%', alignItems: 'center', marginTop: '-40px' }}>
                <TitlePage title="Sign Up" />
                <TextPage text='Welcome Mohammed Muthanna' />
                <FormLogin buttonName='Continue' path='/signup/step-5'>
                    <div className='row' style={{ padding: '0 10px' }}>
                        <div className='col col-lg-4' style={{ padding: '0px' }}>
                            <ImageSignup />
                            {!selectedNational && <div style={{ maxWidth: '97%' }}><TextInputField label='Passport Type' placeholder='Enter your passsport type' required={true} /></div>}
                        </div>
                        <div className='col col-lg-8' style={{
                            paddingLeft: '10px',
                            // marginLeft: '-20px',
                            paddingRight: '0px',
                            // backgroundColor: 'green',
                            maxWidth: '100%'
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
                                ? <TextInputField label='National ID' placeholder='Enter your national ID' required={true} />
                                : <TextInputField label='Passport NO' placeholder='Enter your passport ID' required={true} />
                            }
                            <div style={{ height: '6px' }} />
                            <SelectInputField label='Blood Type' placeholder='Select your blood type' required={true} />
                            {!selectedNational && <TextInputField label='Passport Country Code' placeholder='Enter passport country code' required={true} />}
                        </div>
                    </div>
                    {selectedNational
                        ?
                        <div>
                            <Upload title="Upload the front of national ID card" />
                            <Upload title="Upload the black of national ID card" />
                        </div>
                        : <Upload title="Upload passport document" />
                    }
                </FormLogin>
                <SignOrLogin goSign={false} />
            </div>
        </CardLogin>
    );
};

export default SignupPage3;

