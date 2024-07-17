import React, { useEffect, useRef, useState } from 'react';
import ProfileHeaderIcon from '../component/UserDetails/ProfileHeaderIcon';
import RecordesSearch from "../component/recordesdetails/RecordesSearch";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa6";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import AllRecords from '../component/recordesdetails/AllRecords';
import { useRecoilValue } from 'recoil';
import { loginInfo } from '../Recoil/Atom';
import { Toast } from 'primereact/toast';
import { LuFolderPlus } from 'react-icons/lu';
import RecordesGride from '../component/recordesdetails/RecordesGride';


function RecordesPage(props) {
    const [count, setCount] = useState(0);
    const toast = useRef(null);
    const [records, setRecords] = useState([]);
    const [reports, setReports] = useState([]);
    const [labTests, setLabTests] = useState([]);
    const [radiologies, setRadiologies] = useState([]);
    const [prescriptons, setPrescriptons] = useState([]);
    const [view, setView] = useState(true);
    const loginInfoValue = useRecoilValue(loginInfo);
    const hasEffectRun = useRef(false);

    const handleViewClick = () => setView(!view);

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

    const refreshComponent = () => {
        setCount(prevCount => prevCount + 1); // Change state to trigger re-render
        console.log("Refreshed");
    };

    useEffect(() => {
        const allRecordsFromDatabase = async () => {
            if (!loginInfoValue.patientId) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
                return;
            }
            try {
                const response = await fetch(`http://192.168.137.1:5000/records/${loginInfoValue.patientId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Records Not found' });
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Downloaded Records Successfully' });
                setRecords(jsonData);
            } catch (error) {
                console.error(error.message);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Records Not found' });
            }
        };
        if (!hasEffectRun.current) {
            allRecordsFromDatabase();
            hasEffectRun.current = true;
        }
    }, [loginInfoValue.patientId]);

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

        setLabTests(filterByType("Lab Result"));
        setReports(filterReport);
        setRadiologies(filterByType("Radiology Result"));
        setPrescriptons(filterByType("Prescription"));
    }, [records]);

    return (
        <>
            <Toast ref={toast} />
            <div style={{ width: '100%', height: '100px', padding: '10px' }}>
                <ProfileHeaderIcon image={loginInfoValue.photo} />
            </div>
            <RecordesSearch view={view} handleViewClick={handleViewClick} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
            {view ? (
                <AllRecords
                    icons={icons}
                    tableTitle={props.title}
                    records={records}
                    prescriptons={prescriptons}
                    radiologies={radiologies}
                    labTests={labTests}
                    reports={reports}
                    refresh={refreshComponent}
                />
            ) : (
                <RecordesGride
                    records={records}
                    icons={icons}
                    tableTitle={props.title}
                    prescriptons={prescriptons}
                    radiologies={radiologies}
                    labTests={labTests}
                    reports={reports}
                    refresh={refreshComponent}
                />
            )}
        </>
    );
}

export default RecordesPage;
