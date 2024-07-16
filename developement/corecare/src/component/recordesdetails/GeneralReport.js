import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import profileImage from '../../assets/ahmed.jpg';
import { DynamicInput, DynamicRecordInput } from '../settingdetails/TextFormSetting';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function GeneralReport() {
    // const location = useLocation();
    // const [prescriptionsInfo, setPrescriptionsInfo] = useState(null);

    // useEffect(() => {
    //     const { prescriptionsInfo: prescriptionsInfoString } = queryString.parse(location.search);

    //     if (prescriptionsInfoString) {
    //         const parsedInfo = JSON.parse(prescriptionsInfoString);
    //         setPrescriptionsInfo(parsedInfo);
    //         console.log('prescriptionsInfo', parsedInfo);
    //         console.log('doctorInfo', parsedInfo.doctorInfo);
    //         console.log('doctorPersonInfo', parsedInfo.doctorPersonInfo);
    //         console.log('patientInfo', parsedInfo.patientInfo);
    //         console.log('prescriptions', parsedInfo.prescriptions);
    //     } else {
    //         console.log('no data');
    //     }
    // }, [location.search]);

    const h_1 = {
        color: '#272c34',
        fontSize: '1.3em',
        margin: '5px 0px',
        fontWeight: '700',
        textAlign: 'center',
    };
    const h_6 = {
        color: '#3146ff',
        fontSize: '1.3em',
        margin: '5px 20px',
        fontWeight: '700',
        textAlign: 'center',
    }
    // const items = [
    //     { medicalName: "dexamethazone", dosage: "1*1", note: "before sleep" },
    //     { medicalName: "Augmen", dosage: "2*1", note: "after meal" },
    //     { medicalName: "panadol", dosage: "3*1", note: "every 8 hours" },
    //     { medicalName: "Lanbrol", dosage: "1*1", note: "before breakfast" },
    // ];

    // if (!prescriptionsInfo) {
    //     return <div>Loading...</div>;
    // }

    // function calculateAge(dateOfBirth) {
    //     const today = new Date();
    //     const birthDate = new Date(dateOfBirth);
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const m = today.getMonth() - birthDate.getMonth();
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
    //     return age;
    // }
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // };
    return (
        <>
            <section style={{
                maxWidth: '100%',
                minHeight: '100vh',
                height: '100%',
                padding: '10px',
                overflow: 'hidden',
                backgroundColor: '#272c34',
            }}>

                <div style={{
                    backgroundColor: '#fff',
                    border: 'solid 2px black',
                    width: '80%',
                    height: '100%',
                    minHeight: '90vh',
                    margin: '15px auto',
                    borderRadius: '15px',
                    padding: '10px',
                }}>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        minHeight: '20vh',
                        borderRadius: '8px',
                        margin: '0px auto',
                    }}>

                        <div style={{
                            minWidth: '20%',
                            width: 'fit-content',
                            minHeight: '18vh',
                            margin: '10px',
                        }}>
                            {/* <h1 style={h_1}>{`${prescriptionsInfo.doctorPersonInfo.firstname} ${prescriptionsInfo.doctorPersonInfo.lastname}`}</h1> */}
                            <h1 style={h_1}>Ahmed Qahtan</h1>
                            <h1 style={h_1}>E.N.T</h1>
                            <h1 style={h_1}>Althwora</h1>
                            {/* <h1 style={h_1}>{prescriptionsInfo.doctorInfo.specialization}</h1>
                            <h1 style={h_1}>{prescriptionsInfo.doctorInfo.locationofwork}</h1> */}
                        </div>

                        <Image
                            src={profileImage}
                            thumbnail
                            roundedCircle
                            style={{ width: '130px', height: '130px' }}
                        />

                        <div style={{
                            width: 'max-content',
                            minHeight: '18vh',
                            margin: '10px',
                        }}>
                            <h1 style={h_1}>Yemen-Taiz</h1>
                            <h1 style={h_1}>774714500</h1>

                            {/* <h1 style={h_1}>{`${prescriptionsInfo.doctorPersonInfo.country}`}</h1>
                            <h1 style={h_1}>{`${prescriptionsInfo.doctorPersonInfo.phonenumber}`}</h1> */}
                            <h1 style={h_1}>time 8:00am - 2:00pm</h1>
                        </div>
                    </div>
                    <hr style={{ color: '#000', height: '2px', margin: '5px auto', width: '90%' }} />

                    {/* patient info  */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            width: '90%',
                            margin: '0px auto',
                            minHeight: '20vh',
                            borderRadius: '8px',
                            padding: '5px',
                            border: '1px solid #3146ff'
                        }}
                    >
                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            {/* <DynamicInput label="Name : " type="text" disabled={true} value={`${prescriptionsInfo.patientInfo.firstname} ${prescriptionsInfo.patientInfo.lastname}`} /> */}
                            <DynamicInput label="Name : " type="text" disabled={true} value="" />
                            {/* <DynamicInput label="Age : " type="text" disabled={true} value={calculateAge(prescriptionsInfo.patientInfo.dateofbirth)} /> */}
                            <DynamicInput label="Age : " type="text" disabled={true} value="" />
                        </div>

                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            {/* <DynamicInput label="Sex : " type="text" disabled={true} value={prescriptionsInfo.patientInfo.sex} /> */}
                            <DynamicInput label="Sex : " type="text" disabled={true} value="" />
                            {/* <DynamicInput label="Date : " type="text" disabled={true} value={formatDate(prescriptionsInfo.prescriptions[0].prescriptiondate)} /> */}
                            <DynamicInput label="Date : " type="text" disabled={true} value="" />
                        </div>

                        <div
                            style={{
                                width: '100%',
                                minHeight: '8vh',
                                margin: '5px',
                            }}>
                            {/* <DynamicInput label="Diagnosis : " type="text" disabled={true} value={prescriptionsInfo.diagnosis.diagnosis} /> */}
                            <DynamicInput label="Diagnosis : " type="text" disabled={true} value="" />
                        </div>

                    </div>

                    <hr style={{ color: '#000', height: '2px', margin: '10px auto', width: '90%' }} />

                    <h1 style={{
                        color: '#272c34',
                        fontSize: '1.3em',
                        margin: '5px 0px',
                        fontWeight: '700',
                        textAlign: 'center',
                    }}>General Report</h1>

                    <div style={{
                        border: '1px solid #272c34',
                        width: '90%',
                        margin: '15px auto',
                        minHeight: '15vh',
                        borderRadius: '8px',
                        padding: '5px',
                    }}>

                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    minHeight: '15vh',
                                    padding: '15px',
                                    // backgroundColor: 'red',
                                }}>
                                <div style={{
                                    width: '90%',
                                    minHeight: '10vh',
                                    margin: '0px',
                                }}>
                                    <DynamicInput label="General Diagnosis : " type="text" disabled={true} value="" />
                                </div>

                            </div>

                            <div
                                style={{
                                    width: '100%',
                                    minHeight: '8vh',
                                    // flexWrap: 'wrap',
                                    // display: 'flex',
                                    padding: '15px',
                                    // justifyContent: 'space-between',
                                    // backgroundColor: 'red',
                                }}>
                                <div style={{
                                    width: '90%',
                                    minHeight: '10vh',
                                    margin: '0px',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    display: 'flex',
                                }}>
                                    <label
                                        style={{
                                            color: '#272c34',
                                            fontWeight: '700',
                                        }}>Note : </label>
                                    <textarea
                                        style={{
                                            resize: 'none',
                                            outline: 'none',
                                            borderBottom: '1px solid #3146ff',
                                            width: 'calc(100% - 15%)',
                                            paddingLeft: '5px',
                                        }}

                                        value=""
                                        disabled={true}>
                                    </textarea>
                                </div>
                            </div>

                            <h1 style={{
                                color: '#272c34',
                                fontSize: '1.3em',
                                margin: '25px 20px',
                                fontWeight: '700',
                            }}> Prescribed Medicine</h1>

                            {/*  Prescribed  Medicine*/}
                            <div
                                style={{
                                    width: '75%',
                                    minHeight: '10vh',
                                    margin: '5px  auto 5px 14%',
                                    border: '1px solid #272c34',
                                    borderRadius: '8px',
                                }}>
                                {/* {prescriptionsInfo.prescriptions.map((item, index) => ( */}
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                </div>
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                </div>
                                {/* ))} */}
                            </div>
                            {/* =============================== */}
                            {/*  Prescribed Lab Test*/}
                            <h1 style={{
                                color: '#272c34',
                                fontSize: '1.3em',
                                margin: '25px 20px',
                                fontWeight: '700',
                            }}> Prescribed Lab Test</h1>
                            {/*  Prescribed Lab Test */}
                            <div
                                style={{
                                    width: '75%',
                                    minHeight: '10vh',
                                    margin: '25px  auto 5px 14%',
                                    border: '1px solid #272c34',
                                    borderRadius: '8px',
                                }}>
                                {/* {prescriptionsInfo.prescriptions.map((item, index) => ( */}
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                </div>
                                {/* ))} */}
                            </div>
                            {/* =============================== */}
                            {/*  Prescribed  Radiology*/}
                            <h1 style={{
                                color: '#272c34',
                                fontSize: '1.3em',
                                margin: '25px 20px',
                                fontWeight: '700',
                            }}> Prescribed Radiology</h1>
                            <div
                                style={{
                                    width: '75%',
                                    minHeight: '10vh',
                                    margin: '25px  auto 5px 14%',
                                    border: '1px solid #272c34',
                                    borderRadius: '8px',
                                }}>
                                {/* {prescriptionsInfo.prescriptions.map((item, index) => ( */}
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value="" />
                                </div>
                                {/* ))} */}
                            </div>
                        </>
                    </div>
                    
                    <h6 style={h_6}>Created By CoreCare Platform</h6>
                    <p style={{textAlign:'center'}}>Developed By Comment Soft</p>
                </div>
            </section >
        </>
    );
}
export default GeneralReport;
