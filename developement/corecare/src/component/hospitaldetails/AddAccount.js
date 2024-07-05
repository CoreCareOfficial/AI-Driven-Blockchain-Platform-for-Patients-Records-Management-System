import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountCheckbox, AddAccountCountry, AddAccountForm, AddAccountInput, AddAccountMedicalDegree, AddAccountPassport, AddAccountSelect, AddAccountSpecialization, UpdateImage } from "../settingdetails/TextFormSetting";
import { useRecoilValue, useSetRecoilState } from "recoil";

function AddAccount(props) {
    const medicalSpecializations = [
        'Anesthetics',
        'Breast Screening',
        'Cardiology',
        'Ear, nose and throat (ENT)',
        'Elderly services department',
        'Gastroenterology',
        'General Surgery',
        'Gynecology',
        'Hematology',
        'Neonatal Unit',
        'Neurology',
        'Nutrition and dietetics',
        'Obstetrics and gynecology units',
        'Oncology',
        'Ophthalmology',
        'Orthopedics',
        'Physiotherapy',
        'Renal Unit',
        'Sexual Health',
        'Urology'
    ]

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

    const [selectedNational, setSelectedNational] = useState(true);
    const [selectedPassport, setSelectedPassport] = useState(false);

    // const setUserInfo = useSetRecoilState(userInfo);
    // const userInfoValue = useRecoilValue(userInfo);

    const handleIdTypeChangeNational = (event) => {
        setSelectedNational(true);
        setSelectedPassport(false);
        // setUserInfo((prevUserInfo) => ({
        //     ...prevUserInfo,
        //     'idType': event.target.value
        // }));
        // alert(event.target.value);
    };

    const handleIdTypeChangePassport = (event) => {
        setSelectedPassport(true);
        setSelectedNational(false);
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
                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                                    <AddAccountInput label="First Name:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="Second Name:" name="" value="" type="text" placeholder="" />
                                    <AddAccountInput label="Third Name:" name="" value="" type="text" placeholder="" />
                                    <AddAccountInput label="Last Name:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="Email:" name="" value="" type="email" required={true} placeholder="" />
                                    <AddAccountInput label="Phone Number:" name="" value="" type="text" required={true} placeholder="" />
                                    <AddAccountInput label="Address:" name="" value="" type="text" required={true} placeholder="" />
                                </div>

                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>
                                    <AddAccountInput label="Job:" name="" value="" type="text" placeholder="" />
                                    <AddAccountInput label="Date of Birth:" name="" value="" type="date" required={true} placeholder="" />
                                    <AddAccountSelect items={['Male', 'Female']} label="Sex:" name="AddAccountSex" value={userInfo.sex} />
                                    <AddAccountSelect items={['Single', 'Married']} label="Status:" name="AddAccountSex" value={userInfo.sex} />
                                    <AddAccountCountry label="Country:" name="AddAccountcountry" required={true} value={userInfo.country} />
                                    <AddAccountSelect items={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} 
                                    required={true} label="Blood Type:"
                                    name="AddAccountBlood" value={userInfo.bloodtype} />
                                </div>

                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '30%' }}>

                                    <AddAccountCheckbox label="ID Type:" ch1="National " ch2="Passport "
                                        onChange1={handleIdTypeChangeNational}
                                        checked1={selectedNational}
                                        onChange2={handleIdTypeChangePassport}
                                        checked2={selectedPassport}
                                    />
                                    {selectedPassport ? (
                                        <AddAccountInput label="Passport ID:" name="" value="" type="text" required={true} placeholder="" />
                                    ) :
                                        <AddAccountInput label="National ID:" name="" value="" type="text" required={true} placeholder="" />
                                    }


                                    {selectedPassport ? (
                                        <>
                                            <AddAccountInput label="Passport Type:" name="" value="" type="text" required={true} placeholder="" />
                                            <AddAccountInput label="Passport Code:" name="" value="" type="text" required={true} placeholder="" />
                                            <AddAccountPassport title="Upload passport document *" />
                                        </>
                                    ) :
                                        <>
                                            <AddAccountPassport title="Upload front of national ID card *" />
                                            <AddAccountPassport title="Upload back of national ID card *" />
                                        </>
                                    }
                                    
                                </div>
                            </>
                        </div>
                    </AddAccountForm>
                
            </Container >
        </>
    );
}
export default AddAccount;