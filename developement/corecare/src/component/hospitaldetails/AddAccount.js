import React from "react";
import { Container } from "react-bootstrap";
import { AddAccountCheckbox, AddAccountCountry, AddAccountForm, AddAccountInput, AddAccountPassport, AddAccountSelect, UpdateImage } from "../settingdetails/TextFormSetting";

function AddAccount(props) {
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


    return (
        <>
            <Container>
                <AddAccountForm>
                    <UpdateImage img={userInfo.personalphoto} />

                    <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                            <AddAccountInput label="First Name:" />
                            <AddAccountInput label="Second Name:" />
                            <AddAccountInput label="Third Name:" />
                            <AddAccountInput label="Last Name:" />
                            <AddAccountInput label="Email:" />
                            <AddAccountInput label="Phone Number:" />
                            <AddAccountInput label="Address:" />
                        </div>

                        <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                            <AddAccountInput label="Date of Birth:" />
                            <AddAccountSelect items={['Male', 'Female']} label="Sex:" name="AddAccountSex" value={userInfo.sex} />
                            <AddAccountSelect items={['Single', 'Married']} label="Status:" name="AddAccountSex" value={userInfo.sex} />
                            <AddAccountCountry label="Country:" name="AddAccountcountry" value={userInfo.country} />
                            <AddAccountInput label="Job:" />
                            <AddAccountInput label="Blood Type:" />
                        </div>

                        <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                            <AddAccountCheckbox label="ID Type:" ch1="National " ch2="Passport " />
                            <AddAccountInput label="Passport ID:" />
                            <AddAccountInput label="Passport Type:" />
                            <AddAccountInput label="Passport Code:" />
                            <AddAccountPassport title="Upload front of national ID card *" />
                            <AddAccountPassport title="Upload back of national ID card *" />
                            <AddAccountPassport title="Upload passport document *" />
                            
                        </div>

                    </div>
                </AddAccountForm>
            </Container>
        </>
    );
}
export default AddAccount;