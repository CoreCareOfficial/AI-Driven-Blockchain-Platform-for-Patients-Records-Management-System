import React, { useState } from 'react';
import ProfileHeaderIcon from '../component/UserDetails/ProfileHeaderIcon';
import RecordesSearch from "../component/recordesdetails/RecordesSearch";
import RecordesTable from '../component/recordesdetails/RecordesTable';
import RecordesGride from '../component/recordesdetails/RecordesGride';
import ahmed from '../assets/ahmed.jpg';
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaXRay } from "react-icons/fa6";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
function RecordesPage(props) {

    const [view, setView] = useState(true);
    const handleViewClick = () => {
        setView(!view);
    };
    //========================================
    const icons = {
        "Report": <MdOutlineReceiptLong />,
        "Summary": <FaRegFileLines />,
        "Ray": <FaXRay />,
        "Prescription": <FaFilePrescription />,
        "Lab test": <FaFileLines />
    };

    // const allRecords = {
    //     firstRow: {
    //         "id": 1,
    //         "fav": true,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Report",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     secondRow: {
    //         "id": 2,
    //         "fav": true,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     thirdRow: {
    //         "id": 3,
    //         "Name Of Record": "oooooooooooooooooooooooooooo",
    //         "Type": "Summary",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     fourthRow: {
    //         "id": 4,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     fifthRow: {
    //         "id": 5,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Lab test",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     sixRow: {
    //         "id": 6,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Prescription",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     sevenRow: {
    //         "id": 7,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     eightRow: {
    //         "id": 8,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     nineRow: {
    //         "id": 9,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     tenRow: {
    //         "id": 10,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     elevRow: {
    //         "id": 11,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     twelRow: {
    //         "id": 12,
    //         "Name Of Record": "Report-12 of patient's heart.form",
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    // }

    // =================================
    // const allRecords = {
    //     firstRow: {
    //         "id": 1,
    //         "fav": true,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Report",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     secondRow: {
    //         "id": 2,
    //         "fav": true,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     thirdRow: {
    //         "id": 3,
    //         "Record": {
    //             "Name Of Record": "oooooooooooooooooooooooooooo"
    //         },
    //         "Type": "Summary",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     fourthRow: {
    //         "id": 4,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     fifthRow: {
    //         "id": 5,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Lab test",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     sixRow: {
    //         "id": 6,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Prescription",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     sevenRow: {
    //         "id": 7,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     eightRow: {
    //         "id": 8,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     nineRow: {
    //         "id": 9,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     tenRow: {
    //         "id": 10,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     elevRow: {
    //         "id": 11,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    //     twelRow: {
    //         "id": 12,
    //         "Record": {
    //             "Name Of Record": "Report-12 of patient's heart.form"
    //         },
    //         "Type": "Ray",
    //         "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed",
    //         "Date Of Upload": "22/5/2024"
    //     },
    // };
    // *********************************************************************
    
    const menu = <span style={{ cursor: 'pointer', fontSize:'1.5em' }}
    ><MdMoreHoriz/></span>
    
    // *********************************************************************
    const stars = <span style={{fontSize:'1.3em' }}>
    <IoStarSharp /></span>

    const b = true;
    const [nodes, setNodes] = useState([
        {
            
            key: '0',
            data: { name: 'Record 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Record',date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Diagnosis 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu,date: "1/1/2024", stars: b && stars 
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu,date: "1/1/2024"
                    },
                },
                
            ]
        },
        {
            key: '1',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder',date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Diagnosis 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu,date: "1/1/2024", stars: b && stars 
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu,date: "1/1/2024"
                    },
                },
                
            ]
        },
        {
            key: '2',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder',date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Dignosis 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu,date: "1/1/2024", stars: b && stars 
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu,date: "1/1/2024"
                    },
                },
                
            ]
        },
        {
            key: '3',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder',date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Dignosis 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu,date: "1/1/2024", stars: b && stars 
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu,date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology',"Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu,date: "1/1/2024"
                    },
                },
                
            ]
        },
    ]);

    const getItemsList = (type, nodes) => {
        console.log(type);
        let itemsList = [];
        nodes.forEach(node => {
            node.children.forEach(child => {
                console.log(child.data.type);
                if (child.data.type === type) {
                    itemsList.push(child.data);
                    console.log(child.data.type);
                }
            });
        });
        console.log("hhhh"+itemsList.length);
        return itemsList;
    };

    const recordsList = 
        props.title === 'All Records' ? nodes : 
        getItemsList(props.title, nodes);
    

    return (
        <>
            <div style={{ width: '100%', height: '100px', padding: '10px' }}>
                <ProfileHeaderIcon image={ahmed} />
            </div>
            <RecordesSearch view={view} handleViewClick={handleViewClick} />
            <RecordesTable icons={icons} nodes={recordsList} tableTitle={props.title}/>
        </>
    );
}
export default RecordesPage;