import React, { useState, useEffect, useRef } from 'react';
import RecordesMenu from './RecordesMenu';
import H1 from '../H1';
import { MdMoreHoriz, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { IoStarSharp } from 'react-icons/io5';
import P from '../P';
import "../../css/UserPageStyle/dropdownbutton.css";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Toast } from 'primereact/toast';

function AllRecords(props) {
    const allRecords = props.records || [];
    const reports = props.reports || [];
    const labTests = props.labTests || [];
    const radiologies = props.radiologies || [];
    const prescriptons = props.prescriptons || [];
    const [recordsList, setRecordsList] = useState([]);
    const [fileSelected, setFileSelected] = useState({ id: '', data: {} });
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const itemRight = 50;

    useEffect(() => {
        switch (props.tableTitle) {
            case "Report":
                setRecordsList(reports);
                break;
            case "Lab test":
                setRecordsList(labTests);
                break;
            case "Radiology":
                setRecordsList(radiologies);
                break;
            case "Prescription":
                setRecordsList(prescriptons);
                break;
            default:
                setRecordsList(allRecords);
                break;
        }
    }, [props.tableTitle, reports, labTests, radiologies, prescriptons, allRecords]); // Include dependencies here

    const handleMenuClick = (e, data) => {
        console.log('data', data);
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setMenuPosition({ top: rect.top + scrollTop, left: rect.left });
        setFileSelected({ id: e.target.id, data: data });
        setIsOpen(!isOpen);
    };

    const [expanded, setExpanded] = useState({});

    const handleClick = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleMenuVerticalClick = (e, data) => {
        console.log('e,id', e.target.id);
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        setMenuPosition({ top: rect.top + scrollTop, left: rect.left });
        setFileSelected({ id: e.target.id, data: data });
        setIsOpen2(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    let c = 0;

    const title = props.tableTitle === "All Records" ? "Records" : `${props.tableTitle}s`;

    const toast = useRef(null);
    const handleToast = (t) => {
        toast.current.show(t)
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="Recordes_result">
                <H1 name="result_title" title={`All ${title}`} />
                <P name="result_text" title={`Showing ${recordsList.length} ${title} Results`} />
            </div>
            <table className="records_table">
                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th></th>
                        <th colSpan={2} style={{ width: '39%' }}>Name Of Record</th>
                        <th style={{ width: '13%' }}>Type</th>
                        <th>Name Of Health Provider</th>
                        <th>Date Of Upload</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tableTitle === "All Records" ? (
                        allRecords.map((record) => {
                            const isExpanded = !!expanded[record.key];
                            return (
                                <React.Fragment key={record.key}>
                                    <tr className={`tbody_tr ${c % 2 === 0 && "tr_color"}`}>
                                        <td>
                                            <div className="dropdown-button" onClick={() => handleClick(record.key)}>
                                                <p><span style={{ fontSize: '25px' }}>{isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</span></p>
                                            </div>
                                        </td>
                                        <td colSpan={3}>{record.data["name"]}</td>
                                        <td>{record.data["type"]}</td>
                                        <td>{record.data["Name Of Health Provider"]}</td>
                                        <td>{formatDate(record.data["date"])}</td>
                                        <td></td>
                                        <td><span style={{ cursor: "pointer" }} >
                                            <BsThreeDotsVertical id={record.key} onClick={(e) => handleMenuVerticalClick(e, record.data)} />
                                        </span></td>
                                    </tr>
                                    <p style={{ display: 'none' }}>{c++}</p>
                                    {isExpanded && record.children && record.children.map((child) => (
                                        <>
                                            <tr className={`tbody_tr ${c % 2 === 0 && "tr_color"}`} key={child.key}>
                                                <td></td>
                                                <td><span style={{ display: child.data["star"] ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                                <td><span>{props.icons[child.data["type"]]}</span></td>
                                                <td>{child.data["name"]}</td>
                                                <td>{child.data["type"]}</td>
                                                <td>{child.data["Name Of Health Provider"]}</td>
                                                <td>{formatDate(child.data["date"])}</td>
                                                {console.log('child.data', child.data)}
                                                <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={child.key} onClick={(e) => handleMenuClick(e, child.data)} /></span></td>
                                                <td></td>
                                            </tr>
                                            <p style={{ display: 'none' }}>{c++}</p>
                                        </>
                                    ))}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        recordsList.map((record, i) => (
                            <tr className={`tbody_tr ${i % 2 === 0 && "tr_color"}`} key={record.key}>
                                <td></td>
                                <td><span style={{ display: record.data["star"] ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                <td><span>{props.icons[record.data["type"]]}</span></td>
                                <td>{record.data["name"]}</td>
                                <td>{record.data["type"]}</td>
                                <td>{record.data["Name Of Health Provider"]}</td>
                                <td>{formatDate(record.data["date"])}</td>
                                {console.log('child.data', record.data)}
                                <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={record.key} onClick={(e) => handleMenuClick(e, record.data)} /></span></td>
                                <td></td>
                            </tr>
                        ))
                    )}
                </tbody>
                {isOpen && <RecordesMenu file={fileSelected} top={menuPosition.top} right={itemRight} toast={handleToast} open={true} handleMenuClick={() => setIsOpen(!isOpen)} />}
                {isOpen2 && <RecordesMenu file={fileSelected} top={menuPosition.top} right={itemRight} toast={handleToast} open={true} handleMenuClick={() => setIsOpen2(!isOpen2)} isRecord={true} handleExpanded={handleClick} />}
            </table >
        </>
    );
}

export default AllRecords;
