import React, { useEffect, useState } from "react";
import { DynamicInput, DynamicRecordInput } from "../settingdetails/TextFormSetting";
function GeneralReport(props) {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        setInfo(props.info);
    }, [props.info]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <h1 className="h_1">General Report</h1>

            <div className="GeneralReport-container">

                <>
                    <div className="GeneralReport-inp-div">
                        <div
                            style={{
                                width: '90%',
                                minHeight: '10vh',
                                margin: '0px',
                            }}>
                            <DynamicInput label="General Diagnosis: " type="text" disabled={true} value={info && info.diagnosis.diagnosis} />
                        </div>

                    </div>

                    <div className="GeneralReport-inp-div">
                        <div style={{
                            width: '90%',
                            height: '7vh',
                            margin: '0px',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            display: 'flex',
                        }}>
                            <label style={{ color: '#272c34', fontWeight: '700', }}>
                                Note : </label>
                            <textarea
                                style={{
                                    resize: 'none',
                                    outline: 'none',
                                    height: '7vh',
                                    borderBottom: '1px solid #3146ff',
                                    width: 'calc(100% - 17%)',
                                    paddingLeft: '5px',
                                }}

                                value={info && info.notes.notes && info.notes.notes}
                                disabled={true}>
                            </textarea>
                        </div>
                    </div>

                    {/*  Prescribed  Medicine*/}
                    <h1 className="h_1_t"> Prescribed Medicine</h1>
                    <div
                        style={{
                            width: '75%',
                            minHeight: '10vh',
                            margin: '5px  auto 5px 14%',
                            border: '1px solid #272c34',
                            borderRadius: '8px',
                        }}>
                        {
                            info && info.prescriptions && info.prescriptions.length > 0 && info.prescriptions.map((item, index) => (
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value={`${index + 1}- ${item.medicinename}`} />
                                    <DynamicRecordInput label='' type="text" disabled={true} value={item.dosage} />
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="h_1_t"> Prescribed Lab Test</h1>
                    <div className="Prescribed-div">

                        {
                            info && info.labtests && info.labtests.length > 0 && info.labtests.map((item, index) => (
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value={`${index + 1}- ${item.name}`} />
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="h_1_t"> Prescribed Radiology</h1>
                    <div className="Prescribed-div">
                        {
                            info && info.radiologies && info.radiologies.length > 0 && info.radiologies.map((item, index) => (
                                <div style={{ margin: '5px', display: 'flex' }}>
                                    <DynamicRecordInput label='' type="text" disabled={true} value={`${index + 1}- ${item.name}`} />
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="h_1_t">Next Visit</h1>
                    <div className="Prescribed-div">
                        <div style={{ margin: '5px', display: 'flex', justifyContent: 'space-around' }}>
                            <DynamicInput label="Reason:" type="text" disabled={true} value={info && info.appointments && info.appointments.length > 0 ? info.appointments[0].visitreason : ""} />
                            <DynamicInput label="Date: " type="text" disabled={true} value={info && info.appointments && info.appointments.length > 0 ? `${formatDate(info.appointments[0].nextvisitdate)} ${info.appointments[0].nextvisittime}` : ''} />
                        </div>
                    </div>

                    {/* =============================== */}

                </>
            </div>
        </>
    );
}
export default GeneralReport;