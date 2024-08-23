import React, { useEffect, useRef, useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import H1 from '../H1';
import P from '../P';
import RecordesMenu from './RecordesMenu';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { loginInfo } from '../../Recoil/Atom';
import { useRecoilValue } from 'recoil';
import dotenv from 'dotenv';
dotenv.config();
const SERVER_URL = process.env.SERVER_URL;
// ========================================

function RecordesTable(props) {
    const toast = useRef(null);
    const [records, setRecords] = useState([]);

    const [idSelected, setIdSelected] = useState();
    const [itemTop, setItemTop] = useState(270);
    const [isOpen, setIsOpen] = useState(false);
    const itemRight = 35;

    const handleMenuClick = ((e) => {
        setIdSelected(e.target.id);
        const newTop = (Number(e.target.id) * 50) + 220;
        setItemTop(newTop);
        setIsOpen(!isOpen);
        console.log(isOpen);
    });
    // =================================
    const menu = <span style={{ cursor: 'pointer', fontSize: '1.5em' }} onClick={handleMenuClick}
    ><MdMoreHoriz /></span>

    // *********************************
    const stars = <span style={{ fontSize: '1.3em' }}>
        <IoStarSharp /></span>

    const b = true;
    const nodes = [
        {

            key: '0',
            data: { name: 'Record 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Record', date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Diagnosis 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu, date: "1/1/2024", stars: b && stars
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu, date: "1/1/2024"
                    },
                },

            ]
        },
        {
            key: '1',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder', date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Diagnosis 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu, date: "1/1/2024", stars: b && stars
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu, date: "1/1/2024"
                    },
                },

            ]
        },
        {
            key: '2',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder', date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Dignosis 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu, date: "1/1/2024", stars: b && stars
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu, date: "1/1/2024"
                    },
                },

            ]
        },
        {
            key: '3',
            data: { name: 'Documents', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Folder', date: "1/1/2024" },
            children: [
                {
                    key: '0-0',
                    data: {
                        name: 'Dignosis 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Diagnosis', menu: menu, date: "1/1/2024", stars: b && stars
                    },
                },
                {
                    key: '0-1',
                    data: {
                        name: 'Note 1', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Note', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-2',
                    data: {
                        name: 'Prescription', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Prescription', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-3',
                    data: {
                        name: 'Laboratory Result', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Laboratory', menu: menu, date: "1/1/2024"
                    },
                },
                {
                    key: '0-4',
                    data: {
                        name: 'Radiology', "Name Of Health Provider": "Dr : Ahmed Fahed Al-mojahed", type: 'Radiology', menu: menu, date: "1/1/2024"
                    },
                },

            ]
        },
    ];


    const getItemsList = (type, nodes) => {
        console.log(type);
        let itemsList = [];
        nodes.forEach(node => {
            node.children.forEach(child => {
                // console.log(child.data.type);
                if (child.data.type === type) {
                    itemsList.push(child.data);
                    // console.log(child.data.type);
                }
            });
        });
        console.log("hhhh" + itemsList.length);
        console.log("hhhh" + itemsList);
        return itemsList;
    };


    const recordsList = props.title === 'All Records' ? nodes : getItemsList(props.title, nodes);
    // =================================

    const handleRecordsResult = () => {
        let count = 0;
        console.log(props.tableTitle)
        if (props.tableTitle !== "All Records") {
            Object.keys(nodes).forEach((record) => {
                if (props.tableTitle === props.AllRecord[record]["type"]) {
                    count = count + 1;
                    console.log(nodes.children.data["type"]);
                }
            });
            return count;
        } else {
            return Object.keys(nodes).length;
        }
    };

    // **********************************
    const [globalFilter, setGlobalFilter] = useState('');
    const [filterMode, setFilterMode] = useState('lenient');
    const getHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </IconField>
            </div>
        );
    };
    let header = getHeader();
    // **********************************
    const loginInfoValue = useRecoilValue(loginInfo);
    const allRecordsFromDatabase = async () => {
        if (!loginInfoValue.patientId) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Login First' });
            return <p>Error In Loading Your Info!!</p>
        }
        try {
            const response = await fetch(`${SERVER_URL}/records/${loginInfoValue.patientId}`, {
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
            console.log("jsonData = " + jsonData);
            console.log(jsonData);
            setRecords(jsonData);
            console.log("res = " + response);
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error jsonData' });
        }
    };

    useEffect(() => {
        // if (!records)
        allRecordsFromDatabase();
    }, []);


    return (
        <>
            <Toast ref={toast} />
            <div className="Recordes_result">
                <H1 name="result_title" title={props.tableTitle} />
                <P name="result_text" title={`Showing ${handleRecordsResult()} Records Results`} />
            </div>

            <table className="records_table">

                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th></th>
                        <th style={{ width: '39%' }}>Name Of Record</th>
                        <th style={{ width: '10%' }}> Type</th>
                        <th>Name Of Health Provider</th>
                        <th> Date Of Upload</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>



                    {Object.keys(props.allRecords).map((record) => (
                        props.tableTitle !== "All Records" ?
                            props.tableTitle === props.allRecords[record]["Type"] &&
                            <tr className="tbody_tr" key={props.allRecords[record]['id']}>
                                <td><span style={{ display: `${props.allRecords[record]["fav"] ? 'block' : 'none'}` }}>
                                    <IoStarSharp /></span></td>
                                <td><span>{props.icons[props.allRecords[record]["Type"]]}</span></td>
                                <td>{props.allRecords[record]["Name Of Record"]}</td>
                                <td>{props.allRecords[record]["Type"]}</td>
                                <td>{props.allRecords[record]["Name Of Health Provider"]}</td>
                                <td>{props.allRecords[record]["Date Of Upload"]}</td>
                                <td><span style={{ cursor: 'pointer' }}
                                ><MdMoreHoriz id={props.allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                            </tr>
                            : <tr className="tbody_tr" key={props.allRecords[record]['id']}>
                                <td><span style={{ display: `${props.allRecords[record]["fav"] ? 'block' : 'none'}` }}>
                                    <IoStarSharp /></span></td>
                                <td><span>{props.icons[props.allRecords[record]["Type"]]}</span></td>
                                <td>{props.allRecords[record]["Name Of Record"]}</td>
                                <td>{props.allRecords[record]["Type"]}</td>
                                <td>{props.allRecords[record]["Name Of Health Provider"]}</td>
                                <td>{props.allRecords[record]["Date Of Upload"]}</td>
                                <td><span style={{ cursor: 'pointer' }}
                                ><MdMoreHoriz id={props.allRecords[record]['id']} onClick={handleMenuClick} /></span></td>
                            </tr>

                    ))}

                </tbody>
                {isOpen && <RecordesMenu id={idSelected} top={itemTop} right={itemRight} open={true} handleMenuClick={handleMenuClick} />}
            </table>

            {/* <TreeTable value={records} filterMode={filterMode} tableStyle={{ minWidth: '100%' }}>
                <Column field="stars"></Column>
                <Column field="name" header="Name" expander filter filterPlaceholder="Filter by name"></Column>
                <Column field="type" header="Type" filter filterPlaceholder="Filter by type"></Column>
                <Column field="Name Of Health Provider" header="Health Provider" filter filterPlaceholder="Filter by Provider"></Column>
                <Column field="date" header="Date" filter filterPlaceholder="Filter by Date"></Column>
                <Column field="menu"></Column>
            </TreeTable> */}
            {/* {isOpen&&<RecordesMenu id={idSelected} top={itemTop} right={itemRight} open={true} handleMenuClick={handleMenuClick} />} */}
        </>
    );
}
export default RecordesTable;