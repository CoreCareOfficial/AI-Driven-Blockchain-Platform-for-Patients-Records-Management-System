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
import RecordesGride from '../component/recordesdetails/RecordesGride';

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

    const allRecords = {
        firstRow: {
            "id": 1,
            "fav": true,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Report",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        secondRow: {
            "id": 2,
            "fav": true,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        thirdRow: {
            "id": 3,
            "Name Of Record": "oooooooooooooooooooooooooooo",
            "Type": "Summary",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        fourthRow: {
            "id": 4,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        fifthRow: {
            "id": 5,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Lab test",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        sixRow: {
            "id": 6,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Prescripation",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        sevenRow: {
            "id": 7,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        eightRow: {
            "id": 8,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        nineRow: {
            "id": 9,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        tenRow: {
            "id": 10,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        elevRow: {
            "id": 11,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
        twelRow: {
            "id": 12,
            "Name Of Record": "Report-12 of patient's heart.form",
            "Type": "Ray",
            "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
            "Date Of Upload": "22/5/2024"
        },
    }




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
            {view ? (
                <AllRecords icons={icons} tableTitle={props.title} records={records} prescriptons={prescriptons} radiologies={radiologies} labTests={labTests} reports={reports} />
            ) :
                <RecordesGride allRecords={allRecords} icons={icons} tableTitle="All Records" />
            }
        </>
    );
}
export default RecordesPage;
