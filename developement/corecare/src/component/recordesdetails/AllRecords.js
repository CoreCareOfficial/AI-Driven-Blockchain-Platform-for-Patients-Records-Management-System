import React, { useState, useEffect } from 'react';
import RecordesMenu from './RecordesMenu';
import H1 from '../H1';
import { MdMoreHoriz, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { IoStarSharp } from 'react-icons/io5';
import P from '../P';
import "../../css/UserPageStyle/dropdownbutton.css";

function AllRecords(props) {
    const allRecords = props.records || [];
    const reports = props.reports || [];
    const labTests = props.labTests || [];
    const radiologies = props.radiologies || [];
    const prescriptons = props.prescriptons || [];
    const [recordsList, setRecordsList] = useState([]);
    const [idSelected, setIdSelected] = useState();
    const [itemTop, setItemTop] = useState(270);
    const [isOpen, setIsOpen] = useState(false);
    const itemRight = 35;

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

    const handleMenuClick = (e) => {
        setIdSelected(e.target.id);
        const newTop = (Number(e.target.id) * 50) + 220;
        setItemTop(newTop);
        setIsOpen(!isOpen);
    };

    const [expanded, setExpanded] = useState({});

    const handleClick = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="Recordes_result">
                <H1 name="result_title" title={props.tableTitle} />
                <P name="result_text" title={`Showing ${recordsList.length} Records Results`} />
            </div>
            <table className="records_table">
                <thead className="records_thead">
                    <tr className="thead_tr">
                        <th></th>
                        <th></th>
                        <th colSpan={2} style={{ width: '39%', textAlign: 'center' }}>Name Of Record</th>
                        <th style={{ width: '12%' }}>Type</th>
                        <th>Name Of Health Provider</th>
                        <th>Date Of Upload</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tableTitle === "All Records" ? (
                        allRecords.map((record) => {
                            const isExpanded = !!expanded[record.key];
                            return (
                                <React.Fragment key={record.key}>
                                    <tr className="tbody_tr">
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
                                    </tr>
                                    {isExpanded && record.children && record.children.map((child) => (
                                        <tr className="tbody_tr" key={child.key}>
                                            <td></td>
                                            <td><span style={{ display: child.data["star"] ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                            <td><span>{props.icons[child.data["type"]]}</span></td>
                                            <td>{child.data["name"]}</td>
                                            <td>{child.data["type"]}</td>
                                            <td>{child.data["Name Of Health Provider"]}</td>
                                            <td>{formatDate(child.data["date"])}</td>
                                            <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={record.key} onClick={handleMenuClick} /></span></td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        recordsList.map((record) => (
                            <tr className="tbody_tr" key={record.key}>
                                <td></td>
                                <td><span style={{ display: record.data["star"] ? 'block' : 'none', fontSize: '16px' }}><IoStarSharp /></span></td>
                                <td><span>{props.icons[record.data["type"]]}</span></td>
                                <td>{record.data["name"]}</td>
                                <td>{record.data["type"]}</td>
                                <td>{record.data["Name Of Health Provider"]}</td>
                                <td>{formatDate(record.data["date"])}</td>
                                <td><span style={{ cursor: 'pointer' }}><MdMoreHoriz id={record.key} onClick={handleMenuClick} /></span></td>
                            </tr>
                        ))
                    )}
                </tbody>
                {isOpen && <RecordesMenu id={idSelected} top={itemTop} right={itemRight} open={true} handleMenuClick={handleMenuClick} />}
            </table>
        </>
    );
}

export default AllRecords;
