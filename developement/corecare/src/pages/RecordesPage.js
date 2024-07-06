import React, { useEffect, useRef, useState } from 'react';
import ProfileHeaderIcon from '../component/UserDetails/ProfileHeaderIcon';
import RecordesSearch from "../component/recordesdetails/RecordesSearch";
import ahmed from '../assets/ahmed.jpg';
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

function RecordesPage(props) {
    const toast = useRef(null);
    const [records, setRecords] = useState([]);
    const [reports, setReports] = useState([]);
    const [labTests, setLabTests] = useState([]);
    const [radiologies, setRadiologies] = useState([]);
    const [prescriptons, setPrescriptons] = useState([]);
    const [view, setView] = useState(true);
    const handleViewClick = () => setView(!view);

    const icons = {
        "Report": <MdOutlineReceiptLong />,
        "Summary": <FaRegFileLines />,
        "Radiology Result": <FaXRay />,
        "Prescription": <FaFilePrescription />,
        "Lab Result": <FaFileLines />,
        "Additional": <LuFolderPlus />
    };

    const loginInfoValue = useRecoilValue(loginInfo);
    const hasEffectRun = useRef(false);

    useEffect(() => {
        const allRecordsFromDatabase = async () => {
            if (!loginInfoValue.patientId) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
                return <p>Error In Loading Your Info!!</p>;
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
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Download Records Successfully' });
                setRecords(jsonData);
            } catch (error) {
                console.error(error.message);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error jsonData' });
            }
        };
        if (!hasEffectRun.current) {
            allRecordsFromDatabase();
            hasEffectRun.current = true;
        }
    }, [props.title, loginInfoValue.patientId]);

    useEffect(() => {
        const filterByType = (type) => {
            let filteredRecords = [];
            records.forEach(record => {
                record.children.forEach(child => {
                    if (child.data.type === type) {
                        filteredRecords.push(child);
                    }
                });
            });
            return filteredRecords;
        };

        setLabTests(filterByType("Lab Result"));
        setReports(filterByType("Report"));
        setRadiologies(filterByType("Radiology Result"));
        setPrescriptons(filterByType("Prescription"));
    }, [props.title, records]);

    return (
        <>
            <Toast ref={toast} />
            <div style={{ width: '100%', height: '100px', padding: '10px' }}>
                <ProfileHeaderIcon image={ahmed} />
            </div>
            <RecordesSearch view={view} handleViewClick={handleViewClick} />
            <AllRecords icons={icons} tableTitle={props.title} records={records} prescriptons={prescriptons} radiologies={radiologies} labTests={labTests} reports={reports} />
        </>
    );
}
export default RecordesPage;
