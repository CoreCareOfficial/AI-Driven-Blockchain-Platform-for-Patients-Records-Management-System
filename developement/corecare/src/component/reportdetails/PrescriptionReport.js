import React, { useEffect, useState } from "react";
import { DynamicInput } from "../settingdetails/TextFormSetting";


function PrescriptionReport(props) {
    const [prescriptionsInfo, setPrescriptionsInfo] = useState(null);
    useEffect(() => {
        setPrescriptionsInfo(props.prescriptions);
    }, [props.prescriptions])
    if (!prescriptionsInfo) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="pre-space"></div>
            <h1 className="h_1 titleReport">Prescription</h1>

            <div className="PrescriptionReport-container">
                {prescriptionsInfo.prescriptions.map((item, index) => (
                    <>
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 'fit-content',
                                padding: '15px',
                            }} className="PrescriptionReport-item">

                            <div
                                style={{
                                    width: '40%',
                                    height: 'fit-content',
                                    margin: '0px',
                                }}>
                                <DynamicInput label="Name : " type="text" disabled={true} value={item.medicinename}>
                                    {/* <DynamicInput label="Name : " type="text" disabled={true} value=""> */}
                                    <input type='checkbox' value={item.medicinename} name="Prescription" />
                                    {/* <input type='checkbox' value="" name="Prescription" /> */}
                                </DynamicInput>
                            </div>

                            <div
                                style={{
                                    width: '40%',
                                    minHeight: '10vh',
                                    margin: '0px',
                                }}>
                                <DynamicInput label="Dosage : " type="text" disabled={true} value={item.dosage} />
                                {/* <DynamicInput label="Dosage : " type="text" disabled={true} value="" /> */}
                            </div>

                            <div
                                style={{
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

                                    value={item.notes}
                                    // value=""
                                    disabled={true}>
                                </textarea>
                            </div>

                        </div>

                        {/* ====br=== */}
                        <div
                            style={{
                                margin: '10px auto',
                                width: '90%',
                                height: '10px',
                                color: '#272c34',
                                borderBottom: '1px dashed  #272c34'
                            }}
                        >
                        </div>
                    </>
                ))}

            </div>
        </>
    );
}
export default PrescriptionReport;