import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountForm, AddAccountInput, AddAccountPassport } from "../settingdetails/TextFormSetting";


function UpdateHealthInfo(props) {

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

    // function PageTitle(props) {
    //     const title = props.title.substring(4);
    //     return title;
    // };

    // const [selectedGovernment, setSelectedGovernment] = useState(true);
    // const [selectedPrivate, setSelectedPrivate] = useState(false);

    // const setUserInfo = useSetRecoilState(userInfo);
    // const userInfoValue = useRecoilValue(userInfo);

    // const handleIdTypeChangeGovernment = (event) => {
    //     setSelectedGovernment(true);
    //     setSelectedPrivate(false);
    //     // setUserInfo((prevUserInfo) => ({
    //     //     ...prevUserInfo,
    //     //     'idType': event.target.value
    //     // }));
    //     // alert(event.target.value);
    // };

    // const handleIdTypeChangePrivate = (event) => {
    //     setSelectedPrivate(true);
    //     setSelectedGovernment(false);
    //     // setUserInfo((prevUserInfo) => ({
    //     //     ...prevUserInfo,
    //     //     'idType': event.target.value
    //     // }));
    //     // alert(event.target.value);
    // };

    return (
        <>
            <Container style={{ width: '90%' }}>

                <AddAccountForm label="Add">
                    <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <textarea rows={3} placeholder="Write Note .." style={{
                            margin:'8px 0px',
                            width: 'calc(100% - 50%)',
                            borderBottom: '1px solid #3f4652',
                            outline: 'none',
                            fontWeight: '500',
                            backgroundColor: '#181a1f',
                            color: '#fff',
                            resize:'none',
                        }}>

                        </textarea>
                        <AddAccountPassport title="Upload the document" />
                    </div>
                </AddAccountForm>

                <AddAccountForm label="Add">
                    <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <>
                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                <AddAccountInput label="Blood (HP) :" name="" value="" type="number" required={true} placeholder="" />
                                <AddAccountInput label="Blood Sugar :" name="" value="" type="number" required={true} placeholder="" />
                                <AddAccountInput label="Blood Pressure :" name="" value="" type="number" required={true} placeholder="" />
                            </div>


                            <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                <AddAccountInput label="Heart Rate (Pulse):" name="" value="" type="number" required={true} placeholder="" />
                                <AddAccountInput label="Respiratory Rate :" name="" value="" type="number" required={true} placeholder="" />
                                <AddAccountInput label="Allergies :" name="" value="" type="text" required={true} placeholder="" />
                            </div>
                        </>
                    </div>
                </AddAccountForm>
            </Container >
        </>
    );
}
export default UpdateHealthInfo;
