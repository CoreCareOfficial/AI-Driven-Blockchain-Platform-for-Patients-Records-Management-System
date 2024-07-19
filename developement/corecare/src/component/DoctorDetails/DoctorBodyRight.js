import { MdOutlineReceiptLong } from "react-icons/md";
import DoctorNavContainer from "./DoctorNavContainer";
import MediCondiContainer from "./MediCondiContainer";
import SharedRecords from "./SharedRecords";
import Prescription from "./Prescription";
import { FaFileLines, FaFilePrescription, FaRegFileLines, FaXRay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Diagnosis from "./Diagnosis";
import Radiology from "./Radiology";
import LabTest from "./LabTest";
import UpdateHealthInfo from "../healthproviderdetails/UpdateHealthInfo";
import { LuFolderPlus } from "react-icons/lu";

function DoctorBodyRight(props) {
    const [active, setActive] = useState(
        props.userType === "Doctor" ? 'records' :
            props.userType === "Pharmacy" ? 'pharmacy' :
                props.userType === "Hospital" ? 'laboratory' :
                    props.userType === "Laboratory" ? 'laboratory' :
                        props.userType === "Radiology" ? 'radiology' : null
    );

    const handleRecordslClick = () => {
        setActive('records');
    }

    const handleDiagnosisClick = () => {
        setActive('diagnosis');
    }

    const handleLabClick = () => {
        setActive('lab');
    }

    const handleXrayClick = () => {
        setActive('xray');
    }

    const handlePrescriptionClick = () => {
        setActive('prescription');
    }
    // ================================
    const handleLaboratoryClick = () => {
        setActive('laboratory');
    }
    // ================================
    const handleRadiologyClick = () => {
        setActive('radiology');
    }
    // ================================
    const handlePharmacyClick = () => {
        setActive('pharmacy');
    }

    const handleUpdateClick = () => {
        setActive('update');
    }
    // ================================

    // const toast = useRef(null);
    const [records, setRecords] = useState([]);
    const [reports, setReports] = useState([]);
    const [labTests, setLabTests] = useState([]);
    const [radiologies, setRadiologies] = useState([]);
    const [prescriptons, setPrescriptons] = useState([]);
    const [prescribedlabtes, setPrescribedlabtes] = useState([]);
    const [prescribedradiologytes, setPrescribedradiologytes] = useState([]);
    const [GeneralReport, setGeneralReport] = useState([]);


    useEffect(() => {
        setRecords(props.response);
    }, [props.response])

    const icons = {
        "General Report": <MdOutlineReceiptLong />,
        "prescribed lab test": <MdOutlineReceiptLong />,
        "prescribed radiology test": <MdOutlineReceiptLong />,
        "Summary": <FaRegFileLines />,
        "Radiology Result": <FaXRay />,
        "Prescription": <FaFilePrescription />,
        "Lab Result": <FaFileLines />,
        "Additional": <LuFolderPlus />
    };

    useEffect(() => {
        const filterByType = (type) => {
            return records.flatMap(record =>
                record.children.filter(child => child.data.type === type)
            );
        };
        const filterReport = () => {
            return records.flatMap(record =>
                record.children.filter(child => (child.data.type === "General Report" || child.data.type === "prescribed radiology test" || child.data.type === "prescribed lab test"))
            );
        };

        if (records) {
            setLabTests(filterByType("Lab Result"));
            setGeneralReport(filterByType("General Report"));
            setPrescribedlabtes(filterByType("prescribed lab test"));
            setPrescribedradiologytes(filterByType("prescribed radiology test"));
            setReports(filterReport);
            setRadiologies(filterByType("Radiology Result"));
            setPrescriptons(filterByType("Prescription"));
        }

    }, [records])

    return (
        <div className="flex flex-col w-full">

            <MediCondiContainer pastCondition={props.pastCondition} medication={props.medication} />

            <DoctorNavContainer
                userType={props.userType}
                active={active}
                handleRecordslClick={handleRecordslClick}
                handleDiagnosisClick={handleDiagnosisClick}
                handleLabClick={handleLabClick}
                handleXrayClick={handleXrayClick}
                handlePrescriptionClick={handlePrescriptionClick}
                handleLaboratoryClick={handleLaboratoryClick}
                handleRadiologyClick={handleRadiologyClick}
                handlePharmacyClick={handlePharmacyClick}
                handleUpdateClick={handleUpdateClick}
            />

            {active === 'records' ?
                <SharedRecords
                    icons={icons}
                    tableTitle="All Records"
                    records={records}
                    prescriptons={prescriptons}
                    radiologies={radiologies}
                    labTests={labTests}
                    reports={reports}
                    GeneralReport={GeneralReport}
                    prescribedradiologytes={prescribedradiologytes}
                    prescribedlabtes={prescribedlabtes}
                    patientid={props.patientid}
                />
                : active === 'diagnosis' ?
                    <Diagnosis
                        patientid={props.patientid}
                        keyuser={props.keyuser}
                        handleLabClick={handleLabClick}
                        handleXrayClick={handleXrayClick}
                        handlePrescriptionClick={handlePrescriptionClick}
                    />
                    : active === 'lab' ? <LabTest handleDiagnosisClick={handleDiagnosisClick} />
                        : active === 'xray' ? <Radiology handleDiagnosisClick={handleDiagnosisClick} />
                            : active === 'prescription' ? <Prescription handleDiagnosisClick={handleDiagnosisClick} />
                                : active === 'laboratory' ?
                                    <SharedRecords
                                        icons={icons}
                                        tableTitle="prescribed lab test"
                                        records={records}
                                        prescriptons={prescriptons}
                                        radiologies={radiologies}
                                        labTests={labTests}
                                        reports={reports}
                                        GeneralReport={GeneralReport}
                                        prescribedradiologytes={prescribedradiologytes}
                                        prescribedlabtes={prescribedlabtes}
                                        patientid={props.patientid}
                                    />
                                    : active === 'radiology' ?
                                        <SharedRecords
                                            icons={icons}
                                            tableTitle="prescribed radiology test"
                                            records={records}
                                            prescriptons={prescriptons}
                                            radiologies={radiologies}
                                            labTests={labTests}
                                            reports={reports}
                                            GeneralReport={GeneralReport}
                                            prescribedradiologytes={prescribedradiologytes}
                                            prescribedlabtes={prescribedlabtes}
                                            patientid={props.patientid}
                                        />
                                        : active === 'pharmacy' ?
                                            <SharedRecords
                                                icons={icons}
                                                tableTitle="Prescription"
                                                records={records}
                                                prescriptons={prescriptons}
                                                radiologies={radiologies}
                                                labTests={labTests}
                                                reports={reports}
                                                GeneralReport={GeneralReport}
                                                prescribedradiologytes={prescribedradiologytes}
                                                prescribedlabtes={prescribedlabtes}
                                                patientid={props.patientid}
                                            />
                                            : active === 'update' ? <UpdateHealthInfo handleUpdateClick={handleUpdateClick} />
                                                : null
            }
        </div>
    );
}

export default DoctorBodyRight