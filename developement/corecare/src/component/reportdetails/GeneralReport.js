import React from "react";
import { DynamicInput, DynamicRecordInput } from "../settingdetails/TextFormSetting";
function GeneralReport(props) {
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
                            <DynamicInput label="General Diagnosis : " type="text" disabled={true} value="" />
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

                                value=""
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
                    <h1 className="h_1_t"> Prescribed Lab Test</h1>
                    <div className="Prescribed-div">
                        {/* {prescriptionsInfo.prescriptions.map((item, index) => ( */}
                        <div style={{ margin: '5px', display: 'flex' }}>
                            <DynamicRecordInput label='' type="text" disabled={true} value="" />
                        </div>
                        {/* ))} */}
                    </div>
                    {/* =============================== */}

                    {/*  Prescribed  Radiology*/}

                    <h1 className="h_1_t"> Prescribed Radiology</h1>
                    <div className="Prescribed-div">

                        {/* {prescriptionsInfo.prescriptions.map((item, index) => ( */}

                        <div style={{ margin: '5px', display: 'flex' }}>
                            <DynamicRecordInput label='' type="text" disabled={true} value="" />
                        </div>

                        {/* ))} */}
                    </div>
                    {/* =============================== */}

                    {/* visit hours */}
                    <h1 className="h_1_t">Next Visit</h1>

                    <div className="Prescribed-div">
                        <div style={{ margin: '5px', display: 'flex', justifyContent:'space-around' }}>
                        <DynamicInput label="Reason:" type="text" disabled={true} value="" />
                        <DynamicInput label="Date: " type="text" disabled={true} value="" />

                            {/* <DynamicRecordInput label='' type="text" disabled={true} value="" />
                            <DynamicRecordInput label='' type="text" disabled={true} value="" /> */}
                        </div>
                    </div>

                    {/* =============================== */}

                </>
            </div>
        </>
    );
}
export default GeneralReport;