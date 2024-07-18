import React, { useEffect, useState } from "react";
import ReportBody from "../reportdetails/ReportBody";
import '../../css/summarizedstyle/summarized.css'
import ReportFooter from "../reportdetails/ReportFooter";
import { DynamicInput } from "../settingdetails/TextFormSetting";
import SummarizedReport from "../reportdetails/SummarizedReport";

function Summarized(props) {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        setInfo(props.info);
        console.log("ddd", props.info);
    }, [props.info])

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <>
            <section className="Summarized-section">
                <div style={{
                    width: '90%', height: 'inherit'
                    , margin: '10px auto',
                    padding: '5px',
                    // border: '2px solid #000',
                    position: 'relative',
                    borderRadius: '8px'
                }}>
                    <div className="space"></div>

                    <div className="Summarized-Pat-det-container">
                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            <DynamicInput label="Name : " type="text" disabled={true} value={info && `${info.patientinfo.firstname} ${info.patientinfo.lastname}`} />
                            <DynamicInput label="Age : " type="text" disabled={true} value={info && calculateAge(info.patientinfo.dateofbirth)} />
                        </div>

                        <div
                            style={{
                                width: '40%',
                                minHeight: '10vh',
                                margin: '5px',
                            }}>
                            <DynamicInput label="Sex : " type="text" disabled={true} value={info && info.patientinfo.sex} />
                            <DynamicInput label="Date : " type="text" disabled={true} value={info && formatDate(info.patientinfo.dateofbirth)} />
                        </div>

                    </div>

                    <ReportBody>
                        <SummarizedReport summary={info && info.savedSummary.sammary} />
                        {/* <ReportFooter h6="Created By CoreCare Platform" p="Developed By Comment Soft" /> */}
                    </ReportBody>
                </div>
            </section>
        </>
    );
}
export default Summarized;