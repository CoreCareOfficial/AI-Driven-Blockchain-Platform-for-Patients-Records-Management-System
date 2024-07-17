import React from "react";
import ReportBody from "../reportdetails/ReportBody";
import '../../css/summarizedstyle/summarized.css'
import ReportFooter from "../reportdetails/ReportFooter";
import { DynamicInput } from "../settingdetails/TextFormSetting";
import SummarizedReport from "../reportdetails/SummarizedReport";
function Summarized() {
    return (
        <>
            <section className="Summarized-section">
                <div style={{
                    width: '90%', height: 'inherit'
                    , margin: '10px auto',
                    padding: '5px',
                    // border: '2px solid #000',
                    position: 'relative',
                    borderRadius:'8px'
                }}>
                    <div className="space"></div>

                    <div className="Summarized-Pat-det-container">
                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            {/* <DynamicInput label="Name : " type="text" disabled={true} value={`${info.patientInfo.firstname} ${info.patientInfo.lastname}`} /> */}
                            <DynamicInput label="Name : " type="text" disabled={true} value="" />
                            <DynamicInput label="Age : " type="text" disabled={true} value="" />
                            {/* <DynamicInput label="Age : " type="text" disabled={true} value={calculateAge(info.patientInfo.dateofbirth)} /> */}
                        </div>

                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            {/* <DynamicInput label="Sex : " type="text" disabled={true} value={info.patientInfo.sex} /> */}
                            <DynamicInput label="Sex : " type="text" disabled={true} value="" />
                            <DynamicInput label="Date : " type="text" disabled={true} value="" />
                            {/* <DynamicInput label="Date : " type="text" disabled={true} value={formatDate(info.prescriptions[0].prescriptiondate)} /> */}
                        </div>

                    </div>

                    <ReportBody>
                        <SummarizedReport/>
                        <ReportFooter h6="Created By CoreCare Platform" p="Developed By Comment Soft" />
                    </ReportBody>
                </div>
            </section>
        </>
    );
}
export default Summarized;