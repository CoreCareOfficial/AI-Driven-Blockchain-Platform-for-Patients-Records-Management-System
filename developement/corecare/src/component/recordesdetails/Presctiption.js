import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import profileImage from '../../assets/ahmed.jpg'
import { DynamicInput } from '../settingdetails/TextFormSetting';
function Prescription() {
    const h_1 = {
        color: '#272c34',
        fontSize: '1.3em',
        margin: '5px 0px',
        fontWeight: '700',
        textAlign: 'center',
    };

    const items = [
        { medicalName: "dexamethazone", dosage: "1*1", note: "before sleep" },
        { medicalName: "Augmen", dosage: "2*1", note: "after meal" },
        { medicalName: "panadol", dosage: "3*1", note: "every 8 hours" },
        { medicalName: "Lanbrol", dosage: "1*1", note: "before breakfast" },
    ];




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

                {/* Containet div */}
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

                    {/* head div */}
                    <div style={{
                        // backgroundColor: 'red',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        minHeight: '20vh',
                        borderRadius: '8px',
                        margin: '0px auto',
                    }}
                    >

                        {/* right div */}
                        <div style={{
                            // backgroundColor: 'blue',
                            minWidth: '20%',
                            width: 'fit-content',
                            minHeight: '18vh',
                            margin: '10px',
                        }}>
                            <h1 style={h_1}>Dr.Ahmed Qahtan</h1>
                            <h1 style={h_1}>E.N.T</h1>
                            <h1 style={h_1}>Althawrah Hospital</h1>
                        </div>

                        {/* image */}
                        <Image
                            src={profileImage}
                            thumbnail
                            roundedCircle
                            style={{ width: '130px', height: '130px' }}

                        />

                        {/* left div */}
                        <div style={{
                            // backgroundColor: 'blue',
                            width: 'max-content',
                            minHeight: '18vh',
                            margin: '10px',
                        }}>
                            <h1 style={h_1}>Yemen-Taiz</h1>
                            <h1 style={h_1}>+967774714500</h1>
                            <h1 style={h_1}>time 8:00am - 2:00pm</h1>
                        </div>
                    </div>
                    <hr style={{ color: '#000', height: '2px', margin: '5px auto', width: '90%' }} />

                    {/* details div */}
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
                                // backgroundColor:'greenyellow',
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            <DynamicInput label="Name : " type="text" disabled={true} value="Osama Alathwari" />
                            <DynamicInput label="Age : " type="text" disabled={true} value="24" />
                        </div>

                        <div
                            style={{
                                // backgroundColor:'greenyellow',
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            <DynamicInput label="Sex : " type="text" disabled={true} value="Male" />
                            <DynamicInput label="Date : " type="text" disabled={true} value="01-07-2024" />
                        </div>

                        <div
                            style={{
                                // backgroundColor:'greenyellow',
                                width: '100%',
                                minHeight: '8vh',
                                margin: '5px',
                            }}>
                            <DynamicInput label="Diagnosis : " type="text" disabled={true} value="Cold and flu" />
                        </div>

                    </div>
                    {/* ============================= */}
                    <hr style={{ color: '#000', height: '2px', margin: '10px auto', width: '90%' }} />
                    {/* ============================= */}

                    {/* Medicen div */}
                    <h1 style={{
                        color: '#272c34',
                        fontSize: '1.3em',
                        margin: '5px 0px',
                        fontWeight: '700',
                        textAlign: 'center',
                    }}>Prescription</h1>

                    {items.map((item, index) => (
                        <div key={index}
                            style={{
                                border: '1px solid #272c34',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                width: '90%',
                                minHeight: '15vh',
                                margin: '15px auto',
                                padding: '15px',
                                borderRadius: '8px',
                            }}>
                            <div
                                style={{
                                    // backgroundColor:'greenyellow',
                                    width: '40%',
                                    minHeight: '10vh',
                                    margin: '0px',
                                }}>
                                <DynamicInput label="Name : " type="text" disabled={true} value={item.medicalName}>
                                    <input type='checkbox' value={item.medicalName} name="Prescription" />
                                </DynamicInput>
                            </div>
                            <div
                                style={{
                                    // backgroundColor:'greenyellow',
                                    width: '40%',
                                    minHeight: '10vh',
                                    margin: '0px',
                                }}>
                                <DynamicInput label="Dosage : " type="text" disabled={true} value={item.dosage} />
                            </div>
                            <div
                                style={{
                                    // backgroundColor:'greenyellow',
                                    width: '50%',
                                    minHeight: '8vh',
                                    margin: '0px auto',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-between',
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
                                        width: 'calc(100% - 85px)',
                                        paddingLeft: '5px',
                                    }}

                                    value={item.note}
                                    disabled={true}>
                                </textarea>
                            </div>

                        </div>
                    ))}
                </div>
            </section >
        </>
    );
}
export default Prescription;