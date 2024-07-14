import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountCheckbox, AddAccountCountry, AddAccountForm, AddAccountInput, AddAccountPassport } from "../settingdetails/TextFormSetting";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HealthcareFacilityInfo } from "../../Recoil/Atom";
import { Toast } from "primereact/toast";

function AddPharmacyAccount(props) {

    const h_1 = {
        color: '#fff',
        fontSize: '1.5em',
        fontWeight: '600',
        margin: '10px 0px 30px 0px',
        textAlign: 'center',
    }

    function PageTitle(props) {
        const title = props.title.substring(4);
        return title;
    };

    const [selectedGovernment, setSelectedGovernment] = useState(true);
    const [selectedPrivate, setSelectedPrivate] = useState(false);

    const setUserInfo = useSetRecoilState(HealthcareFacilityInfo);
    const userInfoValue = useRecoilValue(HealthcareFacilityInfo);

    const handleIdTypeChangeGovernment = (event) => {
        setSelectedGovernment(true);
        setSelectedPrivate(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'type': event.target.value
        }));
        // alert(event.target.value);
    };

    const handleIdTypeChangePrivate = (event) => {
        setSelectedPrivate(true);
        setSelectedGovernment(false);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'type': event.target.value
        }));
        // alert(event.target.value);
    };

    const toast = useRef(null);
    const [emailValue, setEmailValue] = useState('');

    const handleOnBlur = async (v, setV) => {
        const checkEmail = {
            email: v
        };
        try {
            const response = await fetch("http://192.168.137.1:5000/login", {
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
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    email: emailValue
                }));
                setV('');
                setEmailValue('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleOnSubmit = async () => {
        console.log(userInfoValue);
        const username = userInfoValue.email.split('@')[0].toLocaleLowerCase().slice(0, 2) +
            userInfoValue.name.toLocaleLowerCase().slice(-2) +
            userInfoValue.phoneNumber.slice(-3) +
            userInfoValue.licenseNumber.slice(-2);
        console.log('username = ' + username);
        let email = '';
        let password = '';
        let successfulAddUser = false;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('type', PageTitle(props));
        formData.append('name', userInfoValue.name);
        formData.append('phoneNumber', userInfoValue.phoneNumber);
        formData.append('email', userInfoValue.email);
        formData.append('country', userInfoValue.country);
        formData.append('address', userInfoValue.address);
        formData.append('licenseNumber', userInfoValue.licenseNumber);
        formData.append('PublicWalletAddress', userInfoValue.PublicWalletAddress);
        formData.append('facility_id', 4);
        formData.append('facilityPhoto', userInfoValue.facilityPhoto);
        formData.append('licenseDocument', userInfoValue.licenseDocument);

        email = userInfoValue.email;
        // password = userInfoValue.password;
        try {
            const response = await fetch("http://192.168.137.1:5000/healthcareproviders/addhealthcareprovider", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                console.log("res = " + response);

                const { hashedPassword } = await response.json();
                password = hashedPassword;
                // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Pharmacy Added Successfully' });
                successfulAddUser = true;
            } else {
                successfulAddUser = false;
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed Adding Pharmacy` });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            successfulAddUser = false;
        }
        if (successfulAddUser && email && password && username) {
            console.log("save in login");
            const loginData = {
                email: email,
                password: password,
                userType: 'Pharmacy',
                username: username
            };

            try {
                const userResponse = await fetch("http://192.168.137.1:5000/login/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                if (userResponse.ok) {
                    console.log("User Added Successful");
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'User could not be added' });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something error' });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Container>
                <AddAccountForm label="Add Pharmacy" onSubmit={handleOnSubmit}>
                    <h1 style={h_1}>Create {PageTitle(props)} Account</h1>
                    {/* <UpdateImage img={userInfo.personalphoto} /> */}
                    <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <>
                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                <AddAccountInput label={`${PageTitle(props)} Name: *`} name='name' value="" type="text" required={true} placeholder="" isFacility={true} />
                                <AddAccountInput label="Email: *" name="email" value="" type="email" required={true} placeholder="" isFacility={true} onBlur={handleOnBlur} />
                                <AddAccountInput label="Phone Number: *" name="phoneNumber" value="" type="text" required={true} placeholder="" isFacility={true} />
                                <AddAccountCountry label="Country:" name='country' required={true} value='' isFacility={true} />
                                <AddAccountInput label="Address: *" name="address" value="" type="text" required={true} placeholder="" isFacility={true} />
                            </div>

                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                <AddAccountCheckbox label={`${PageTitle(props)} Type :`} ch1="Government " ch2="Private "
                                    onChange1={handleIdTypeChangeGovernment}
                                    value1="Government"
                                    value2="Private"
                                    checked1={selectedGovernment}
                                    onChange2={handleIdTypeChangePrivate}
                                    checked2={selectedPrivate}
                                    isFacility={true}
                                />
                                {/* {selectedGovernment ? ( */}
                                {/* <> */}
                                <AddAccountInput label="License Number: *" name="licenseNumber" value="" type="text" required={true} placeholder="" isFacility={true} />
                                <AddAccountPassport title="Upload the license document" name='licenseDocument' isFacility={true} />
                                {/* </>
                                ) :
                                    null
                                } */}

                            </div>
                        </>
                    </div>
                </AddAccountForm>

            </Container >
        </>
    );
}
export default AddPharmacyAccount;