import React, { useEffect, useState } from "react";
import '../css/ReportPageStyle/ReportStyle.css';
import ReportBody from "../component/reportdetails/ReportBody";
import ReportFooter from "../component/reportdetails/ReportFooter";
import ReportHeader from "../component/reportdetails/ReportHedar";
import GeneralReport from "../component/reportdetails/GeneralReport";
import PrescriptionReport from "../component/reportdetails/PrescriptionReport";
import LabAndRadReport from "../component/reportdetails/LabAndRadReport";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "primereact/button";
import Summarized from "../component/summarizedetails/Summarized";



function ReportPage() {
    const location = useLocation();
    const [info, setInfo] = useState(null);
    const [reportType, setReportType] = useState('');
    const [action, setAction] = useState('open');
    const [prescriptionsInfo, setPrescriptionsInfo] = useState(null);

    useEffect(() => {
        const { info: infoString, type: typeInfo, action: actionSting } = queryString.parse(location.search);
        if (infoString) {
            const parsedInfo = JSON.parse(infoString);
            const type = typeInfo;
            setInfo(parsedInfo);
            setReportType(type);
            setAction(actionSting);
            if (type === 'prescription') {
                setPrescriptionsInfo(parsedInfo);
            } else if (type === 'lab') {
                console.log('lab', parsedInfo);
            }
        } else {
            console.log('no data');
        }
    }, [location.search]);

    const bodyReport = () => {
        return (
            <ReportBody>
                {reportType !== "summarized" ? (
                    <ReportHeader info={info ? info : null} />
                ) : null}

                {reportType === "general" ? (
                    <GeneralReport info={info} />
                ) : reportType === "prescription" ? (
                    <PrescriptionReport prescriptions={prescriptionsInfo ? prescriptionsInfo : null} />
                ) : (reportType === "lab" || reportType === "rad") ? (
                    <LabAndRadReport type={reportType} info={info} />
                ) : reportType === "summarized" ? (
                    <Summarized info={info} />
                ) : null}

                <ReportFooter h6="Created By CoreCare Platform" p="Developed By Comment Soft" />
            </ReportBody>
        );
    };

    // const action = "print";

    return (
        <>
            {action === "open" ? (
                <section className="ReportPage-open">
                    {bodyReport()}
                </section>

            ) : action === "print" ? (

                <section className="ReportPage-print">
                    <span style={{
                        fontSize: '3em',
                        color: '#000',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                    }}>
                        <IoMdCloseCircle onClick={window.close} />
                    </span>
                    <div style={{
                        width: '80%', height: 'inherit'
                        , margin: '0px auto'
                    }}>
                        {bodyReport()}
                        <Button type="submit" label="Print" className="fixed  w-24 bottom-2 right-5 bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2" />
                    </div>
                </section>
            ) : null}
        </>
    );
}

export default ReportPage;
