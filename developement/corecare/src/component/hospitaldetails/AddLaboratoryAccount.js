import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountCheckbox, AddAccountCountry, AddAccountForm, AddAccountInput, AddAccountPassport, AddAccountSelect, UpdateImage } from "../settingdetails/TextFormSetting";

function AddLaboratoryAccount(props) {
    const {
        userInfo = {
            firstname: "",
            secondname: "",
            thirdname: "",
            lastname: "",
            phonenumber: "",
            address: "",
            username: "",
            country: "",
            job: "",
            sex: "",
            dateOfBirth: "0000-01-01",
            status: "",
            bloodtype: "",
            personalphoto: null
        },
        healthInfo = { weight: "", height: "" },
        allergies = { allergyname: "" },
        practice = {
            practicelocation: "",
            affiliations: "",
            practicehours: "",
            languagesspoken: ""
        }
    } = props;
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

    // const setUserInfo = useSetRecoilState(userInfo);
    // const userInfoValue = useRecoilValue(userInfo);

    const handleIdTypeChangeGovernment = (event) => {
        setSelectedGovernment(true);
        setSelectedPrivate(false);
        // setUserInfo((prevUserInfo) => ({
        //     ...prevUserInfo,
        //     'idType': event.target.value
        // }));
        // alert(event.target.value);
    };

    const handleIdTypeChangePrivate = (event) => {
        setSelectedPrivate(true);
        setSelectedGovernment(false);
        // setUserInfo((prevUserInfo) => ({
        //     ...prevUserInfo,
        //     'idType': event.target.value
        // }));
        // alert(event.target.value);
    };


    return (
        <>
            <Container>
                    <AddAccountForm label="Add User">
                        <h1 style={h_1}>Create {PageTitle(props)} Account</h1>
                        <UpdateImage img={userInfo.personalphoto} />
                        <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                            <>
                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                    <AddAccountInput label={`${PageTitle(props)} Name :`} name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="Email:" name="" value="" type="email" required={true} placeholder="" />
                                    <AddAccountInput label="Phone Number:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="Address:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="License Number:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountCountry label="Country:" name="AddAccountcountry" required={true} value={userInfo.country} />
                                </div>


                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                    <AddAccountCheckbox label={`${PageTitle(props)} Type :`} ch1="Government " ch2="Private "
                                        onChange1={handleIdTypeChangeGovernment}
                                        checked1={selectedGovernment}
                                        onChange2={handleIdTypeChangePrivate}
                                        checked2={selectedPrivate}
                                    />
                                    {selectedGovernment ? (
                                        <>
                                            <AddAccountPassport title="Upload the license document" />
                                        </>
                                    ) :
                                        null
                                    }

                                </div>
                            </>
                        </div>
                    </AddAccountForm>
                
            </Container >
        </>
    );
}
export default AddLaboratoryAccount;